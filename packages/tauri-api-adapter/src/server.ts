/**
 * This file is the server-side implementation of Tauri API Adapter
 * Code from here should run in regular Tauri webview environment, not iframe or web worker. i.e. needs access to Tauri APIs (invoke is called here)
 * Client from iframe or web worker can call APIs exposed from here
 */
import type { FetchOptions, FetchSendResponse } from '@/api/fetch/types'
import { Channel, invoke, transformCallback } from '@tauri-apps/api/core'
import { emit, emitTo, once, type EventCallback, type EventName, type EventTarget } from '@tauri-apps/api/event'
import {
  ask as dialogAsk,
  confirm as dialogConfirm,
  message as dialogMessage,
  open as dialogOpen,
  save as dialogSave
} from '@tauri-apps/plugin-dialog'
import {
  copyFile as fsCopyFile,
  create as fsCreate,
  exists as fsExists,
  lstat as fsLstat,
  mkdir as fsMkdir,
  readDir as fsReadDir,
  readFile as fsReadFile,
  readTextFile as fsReadTextFile,
  remove as fsRemove,
  rename as fsRename,
  stat as fsStat,
  truncate as fsTruncate,
  writeFile as fsWriteFile,
  writeTextFile as fsWriteTextFile
} from '@tauri-apps/plugin-fs'
import {
  active as notificationActive,
  cancel as notificationCancel,
  cancelAll as notificationCancelAll,
  channels as notificationChannels,
  createChannel as notificationCreateChannel,
  isPermissionGranted as notificationIsPermissionGranted,
  onAction as notificationOnAction,
  onNotificationReceived as notificationOnNotificationReceived,
  pending as notificationPending,
  registerActionTypes as notificationRegisterActionTypes,
  removeActive as notificationRemoveActive,
  removeAllActive as notificationRemoveAllActive,
  removeChannel as notificationRemoveChannel,
  requestPermission as notificationRequestPermission,
  sendNotification as notificationSendNotification
} from '@tauri-apps/plugin-notification'
import {
  arch as osArch,
  eol as osEol,
  exeExtension as osExeExtension,
  family as osFamily,
  hostname as osHostname,
  locale as osLocale,
  platform as osPlatform,
  version as osVersion
} from '@tauri-apps/plugin-os'
import clipboard from 'tauri-plugin-clipboard-api'
import {
  findAvailablePort as networkFindAvailablePort,
  getInterfaces as networkGetInterfaces,
  getNonEmptyInterfaces as networkGetNonEmptyInterfaces,
  isHttpPortOpen as networkIsHttpPortOpen,
  isPortTaken as networkIsPortTaken,
  localServerIsRunning as networkLocalServerIsRunning,
  nonLocalhostNetworks as networkNonLocalhostNetworks,
  scanLocalNetworkOnlineHostsByPort as networkScanLocalNetworkOnlineHostsByPort,
  scanOnlineIpPortPairs as networkScanOnlineIpPortPairs,
  scanOnlineIpsByPort as networkScanOnlineIpsByPort
} from 'tauri-plugin-network-api'
import {
  executeAppleScript as shellExecuteAppleScript,
  executeBashScript as shellExecuteBashScript,
  executeNodeScript as shellExecuteNodeScript,
  executePowershellScript as shellExecutePowershellScript,
  executePythonScript as shellExecutePythonScript,
  executeZshScript as shellExecuteZshScript,
  hasCommand as shellHasCommand,
  likelyOnWindows as shellLikelyOnWindows,
  open as shellOpen,
  type ChildProcess,
  type CommandEvent,
  type InternalSpawnOptions,
  type IOPayload
} from 'tauri-plugin-shellx-api'
import {
  allSysInfo as sysInfoAllSysInfo,
  batteries as sysInfoBatteries,
  components as sysInfoComponents,
  cpuCount as sysInfoCpuCount,
  cpuInfo as sysInfoCpuInfo,
  cpus as sysInfoCpus,
  debugCommand as sysInfoDebugCommand,
  disks as sysInfoDisks,
  hostname as sysInfoHostname,
  kernelVersion as sysInfoKernelVersion,
  memoryInfo as sysInfoMemoryInfo,
  name as sysInfoName,
  networks as sysInfoNetworks,
  osVersion as sysInfoOsVersion,
  processes as sysInfoProcesses,
  refreshAll as sysInfoRefreshAll,
  refreshCpu as sysInfoRefreshCpu,
  refreshMemory as sysInfoRefreshMemory,
  refreshProcesses as sysInfoRefreshProcesses,
  staticInfo as sysInfoStaticInfo,
  totalMemory as sysInfoTotalMemory,
  totalSwap as sysInfoTotalSwap,
  usedMemory as sysInfoUsedMemory,
  usedSwap as sysInfoUsedSwap
} from 'tauri-plugin-system-info-api'
import type {
  IClipboardServer,
  IDialogServer,
  IEventServer,
  IFetchServer,
  IFsServer,
  IFullAPI,
  INetworkServer,
  INotificationServer,
  IOsServer,
  IShellServer,
  ISystemInfoServer
} from './api/server-types'
import { checkPermission, type ClipboardPermissions } from './permissions'

/* -------------------------------------------------------------------------- */
/*                                    Event                                   */
/* -------------------------------------------------------------------------- */
export const eventApi: IEventServer = {
  eventRawListen<T>(event: EventName, target: EventTarget, handler: EventCallback<T>): Promise<number> {
    return invoke<number>('plugin:event|listen', {
      event,
      target,
      handler: transformCallback(handler)
    })
  },
  eventRawUnlisten: (event: string, eventId: number): Promise<void> =>
    invoke<void>('plugin:event|unlisten', {
      event,
      eventId
    }),
  eventEmit: emit,
  eventEmitTo: emitTo,
  eventOnce: once
}

/* -------------------------------------------------------------------------- */
/*                                  Clipboard                                 */
/* -------------------------------------------------------------------------- */
export function constructClipboardApi(permissions: ClipboardPermissions[]): IClipboardServer {
  return {
    clipboardReadText: checkPermission<ClipboardPermissions>(
      ['clipboard:read-text', 'clipboard:read-all'],
      permissions
    )(clipboard.readText),
    clipboardWriteText: checkPermission<ClipboardPermissions>(
      ['clipboard:write-text', 'clipboard:write-all'],
      permissions
    )(clipboard.writeText),
    clipboardReadImageBase64: checkPermission<ClipboardPermissions>(
      ['clipboard:read-all', 'clipboard:read-image'],
      permissions
    )(clipboard.readImageBase64),
    clipboardReadImageBinary: checkPermission<ClipboardPermissions>(
      ['clipboard:read-all', 'clipboard:read-image'],
      permissions
    )(clipboard.readImageBinary),
    clipboardWriteImageBase64: checkPermission<ClipboardPermissions>(
      ['clipboard:write-all', 'clipboard:write-image'],
      permissions
    )(clipboard.writeImageBase64),
    clipboardWriteImageBinary: checkPermission<ClipboardPermissions>(
      ['clipboard:write-all', 'clipboard:write-image'],
      permissions
    )(clipboard.writeImageBinary),
    clipboardReadFiles: checkPermission<ClipboardPermissions>(
      ['clipboard:read-all', 'clipboard:read-files'],
      permissions
    )(clipboard.readFiles),
    clipboardWriteFiles: checkPermission<ClipboardPermissions>(
      ['clipboard:write-all', 'clipboard:write-files'],
      permissions
    )(clipboard.writeFiles),
    clipboardReadRtf: checkPermission<ClipboardPermissions>(
      ['clipboard:read-all', 'clipboard:read-text'],
      permissions
    )(clipboard.readRtf),
    clipboardWriteRtf: checkPermission<ClipboardPermissions>(
      ['clipboard:write-all', 'clipboard:write-text'],
      permissions
    )(clipboard.writeRtf),
    clipboardReadHtml: checkPermission<ClipboardPermissions>(
      ['clipboard:read-all', 'clipboard:read-text'],
      permissions
    )(clipboard.readHtml),
    clipboardWriteHtml: checkPermission<ClipboardPermissions>(
      ['clipboard:write-all', 'clipboard:write-text'],
      permissions
    )(clipboard.writeHtml),
    clipboardWriteHtmlAndText: checkPermission<ClipboardPermissions>(
      ['clipboard:write-all', 'clipboard:write-text'],
      permissions
    )(clipboard.writeHtmlAndText),
    clipboardHasText: checkPermission<ClipboardPermissions>([], permissions)(clipboard.hasText),
    clipboardHasRTF: checkPermission<ClipboardPermissions>([], permissions)(clipboard.hasRTF),
    clipboardHasHTML: checkPermission<ClipboardPermissions>([], permissions)(clipboard.hasHTML),
    clipboardHasImage: checkPermission<ClipboardPermissions>([], permissions)(clipboard.hasImage),
    clipboardHasFiles: checkPermission<ClipboardPermissions>([], permissions)(clipboard.hasFiles)
    // clipboardStartMonitor: checkPermission<ClipboardPermissions>([], permissions)(clipboard.startMonitor)
  }
}
export const defaultClipboardApi = constructClipboardApi(['clipboard:read-all', 'clipboard:write-all'])

/* -------------------------------------------------------------------------- */
/*                                   Dialog                                   */
/* -------------------------------------------------------------------------- */
export const dialogApi: IDialogServer = {
  dialogAsk,
  dialogConfirm,
  dialogMessage,
  dialogOpen,
  dialogSave
}

/* -------------------------------------------------------------------------- */
/*                                Notification                                */
/* -------------------------------------------------------------------------- */
export const notificationApi: INotificationServer = {
  notificationIsPermissionGranted,
  notificationRequestPermission,
  notificationSendNotification,
  notificationRegisterActionTypes,
  notificationPending,
  notificationCancel,
  notificationCancelAll,
  notificationActive,
  notificationRemoveActive,
  notificationRemoveAllActive,
  notificationCreateChannel,
  notificationRemoveChannel,
  notificationChannels,
  notificationOnNotificationReceived,
  notificationOnAction
}

/* -------------------------------------------------------------------------- */
/*                                 File System                                */
/* -------------------------------------------------------------------------- */
export const fsApi: IFsServer = {
  fsReadDir,
  fsReadFile,
  fsReadTextFile,
  fsStat,
  fsLstat,
  fsExists,
  fsMkdir,
  fsCreate,
  fsCopyFile,
  fsRemove,
  fsRename,
  fsTruncate,
  fsWriteFile,
  fsWriteTextFile
}

/* -------------------------------------------------------------------------- */
/*                                     OS                                     */
/* -------------------------------------------------------------------------- */
export const osApi: IOsServer = {
  osPlatform,
  osArch,
  osExeExtension,
  osFamily,
  osHostname,
  osEol: () => Promise.resolve(osEol()),
  osVersion,
  osLocale
}

/* -------------------------------------------------------------------------- */
/*                                    Shell                                   */
/* -------------------------------------------------------------------------- */
export const shellApi: IShellServer = {
  shellExecute: (program: string, args: string[], options: InternalSpawnOptions): Promise<ChildProcess<IOPayload>> =>
    invoke<ChildProcess<IOPayload>>('plugin:shellx|execute', {
      program: program,
      args: args,
      options: options
    }),
  shellKill: (pid: number) =>
    invoke<void>('plugin:shellx|kill', {
      cmd: 'killChild',
      pid: pid
    }),
  shellStdinWrite: (buffer: string | number[], pid: number) =>
    invoke('plugin:shellx|stdin_write', {
      buffer: buffer,
      pid: pid
    }),
  shellOpen,
  shellRawSpawn: <O extends IOPayload>(
    program: string,
    args: string[],
    options: InternalSpawnOptions,
    cb: (evt: CommandEvent<O>) => void
  ): Promise<number> => {
    const onEvent = new Channel<CommandEvent<O>>()
    onEvent.onmessage = cb
    return invoke<number>('plugin:shellx|spawn', {
      program: program,
      args: args,
      options: options,
      onEvent
    })
  },
  shellExecuteBashScript,
  shellExecutePowershellScript,
  shellExecuteAppleScript,
  shellExecutePythonScript,
  shellExecuteZshScript,
  shellExecuteNodeScript,
  shellHasCommand,
  shellLikelyOnWindows
}

/* -------------------------------------------------------------------------- */
/*                                    Fetch                                   */
/* -------------------------------------------------------------------------- */
export const fetchApi: IFetchServer = {
  fetchRawFetch: (options: FetchOptions) => invoke<number>('plugin:http|fetch', options),
  fetchFetchCancel: (rid: number) => invoke<void>('plugin:http|fetch_cancel', { rid }),
  fetchFetchSend: (rid: number) => invoke<FetchSendResponse>('plugin:http|fetch_send', { rid }),
  fetchFetchReadBody: (rid: number) => invoke<ArrayBuffer | number[]>('plugin:http|fetch_read_body', { rid })
}

/* -------------------------------------------------------------------------- */
/*                                 System Info                                */
/* -------------------------------------------------------------------------- */
export const systemInfoAPI: ISystemInfoServer = {
  sysInfoAllSysInfo,
  sysInfoTotalMemory,
  sysInfoUsedMemory,
  sysInfoTotalSwap,
  sysInfoUsedSwap,
  sysInfoMemoryInfo,
  sysInfoHostname,
  sysInfoName,
  sysInfoKernelVersion,
  sysInfoOsVersion,
  sysInfoStaticInfo,
  sysInfoComponents,
  sysInfoCpus,
  sysInfoCpuCount,
  sysInfoCpuInfo,
  sysInfoDisks,
  sysInfoNetworks,
  sysInfoProcesses,
  sysInfoRefreshAll,
  sysInfoRefreshMemory,
  sysInfoRefreshCpu,
  sysInfoRefreshProcesses,
  sysInfoDebugCommand,
  sysInfoBatteries
}

/* -------------------------------------------------------------------------- */
/*                                   Network                                  */
/* -------------------------------------------------------------------------- */
export const networkAPI: INetworkServer = {
  networkGetInterfaces,
  networkGetNonEmptyInterfaces,
  networkFindAvailablePort,
  networkIsPortTaken,
  networkIsHttpPortOpen,
  networkScanOnlineIpPortPairs,
  networkScanOnlineIpsByPort,
  networkNonLocalhostNetworks,
  networkLocalServerIsRunning,
  networkScanLocalNetworkOnlineHostsByPort
}

/**
 * The default server API enables all APIs, if you need to apply permission control,
 * use the corresponding API constructor function to create the API object,
 * then combine with the default `defaultServerAPI`
 * @example
 * ```ts
 * // This clipboard API only allows read-image and write-text
 * const clipboardApi = constructClipboardApi(['clipboard:read-image', 'clipboard:write-text'])
 * const serverAPI = {
 *  ...defaultServerAPI,
 * ...clipboardApi
 * }
 * ```
 */
export const defaultServerAPI: IFullAPI = {
  ...defaultClipboardApi,
  ...dialogApi,
  ...notificationApi,
  ...fsApi,
  ...osApi,
  ...shellApi,
  ...fetchApi,
  ...systemInfoAPI,
  ...networkAPI,
  ...eventApi
}
