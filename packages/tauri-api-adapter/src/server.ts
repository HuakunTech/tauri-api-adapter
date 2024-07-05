/**
 * This file is the server-side implementation of Tauri API Adapter
 * Code from here should run in regular Tauri webview environment, not iframe or web worker. i.e. needs access to Tauri APIs (invoke is called here)
 * Client from iframe or web worker can call APIs exposed from here
 */
import { Channel, invoke, transformCallback } from '@tauri-apps/api/core'
import { emit, emitTo, once, type EventCallback, type EventName, type EventTarget } from '@tauri-apps/api/event'
import {
  appCacheDir as pathAppCacheDir,
  appConfigDir as pathAppConfigDir,
  appDataDir as pathAppDataDir,
  appLocalDataDir as pathAppLocalDataDir,
  appLogDir as pathAppLogDir,
  audioDir as pathAudioDir,
  BaseDirectory as pathBaseDirectory,
  basename as pathBasename,
  cacheDir as pathCacheDir,
  configDir as pathConfigDir,
  dataDir as pathDataDir,
  delimiter as pathDelimiter,
  desktopDir as pathDesktopDir,
  dirname as pathDirname,
  documentDir as pathDocumentDir,
  downloadDir as pathDownloadDir,
  executableDir as pathExecutableDir,
  extname as pathExtname,
  fontDir as pathFontDir,
  homeDir as pathHomeDir,
  isAbsolute as pathIsAbsolute,
  join as pathJoin,
  localDataDir as pathLocalDataDir,
  normalize as pathNormalize,
  pictureDir as pathPictureDir,
  publicDir as pathPublicDir,
  resolve as pathResolve,
  resolveResource as pathResolveResource,
  resourceDir as pathResourceDir,
  runtimeDir as pathRuntimeDir,
  sep as pathSep,
  tempDir as pathTempDir,
  templateDir as pathTemplateDir,
  videoDir as pathVideoDir
} from '@tauri-apps/api/path'
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
  attachConsole as loggerAttachConsole,
  attachLogger as loggerAttachLogger,
  debug as loggerDebug,
  error as loggerError,
  info as loggerInfo,
  trace as loggerTrace,
  warn as loggerWarn,
  type LogOptions
} from '@tauri-apps/plugin-log'
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
import { download, upload } from '@tauri-apps/plugin-upload'
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
import type { FetchOptions, FetchSendResponse } from './api/fetch/types'
import type {
  IClipboardServer,
  IDialogServer,
  IEventServer,
  IFetchServer,
  IFsServer,
  IFullAPI,
  ILoggerServer,
  INetworkServer,
  INotificationServer,
  IOsServer,
  IPathServer,
  IShellServer,
  ISystemInfoServer,
  IUpdownloadServer
} from './api/server-types'
import {
  checkPermission,
  type AllPermission,
  type ClipboardPermission,
  type DialogPermission,
  type FetchPermission,
  type FsPermission,
  type NetworkPermission,
  type NotificationPermission,
  type OsPermission,
  type ShellPermission,
  type SystemInfoPermission,
  type UpdownloadPermission
} from './permissions'

/* -------------------------------------------------------------------------- */
/*                               Upload Download                              */
/* -------------------------------------------------------------------------- */
export function constructUpdownloadApi(permissions: UpdownloadPermission[]): IUpdownloadServer {
  return {
    upload: checkPermission<UpdownloadPermission>(['updownload:upload'], permissions)(upload),
    download: checkPermission<UpdownloadPermission>(['updownload:download'], permissions)(download)
  }
}
export const defaultUpdownloadApi = constructUpdownloadApi(['updownload:upload', 'updownload:download'])
/* -------------------------------------------------------------------------- */
/*                                   Logger                                   */
/* -------------------------------------------------------------------------- */
export const loggerApi: ILoggerServer = {
  // loggerAttachConsole,
  // loggerAttachLogger,
  loggerDebug,
  loggerError,
  loggerInfo,
  loggerTrace,
  loggerWarn
}

/* -------------------------------------------------------------------------- */
/*                                    Path                                    */
/* -------------------------------------------------------------------------- */
export const pathApi: IPathServer = {
  pathAppCacheDir,
  pathAppConfigDir,
  pathAppDataDir,
  pathAppLocalDataDir,
  pathAppLogDir,
  pathAudioDir,
  pathBasename,
  pathCacheDir,
  pathConfigDir,
  pathDataDir,
  pathDelimiter: () => Promise.resolve(pathDelimiter()),
  pathDesktopDir,
  pathDirname,
  pathDocumentDir,
  pathDownloadDir,
  pathExecutableDir,
  pathExtname,
  pathFontDir,
  pathHomeDir,
  pathIsAbsolute,
  pathJoin,
  pathLocalDataDir,
  pathNormalize,
  pathPictureDir,
  pathPublicDir,
  pathResolve,
  pathResolveResource,
  pathResourceDir,
  pathRuntimeDir,
  pathSep: () => Promise.resolve(pathSep()),
  pathTempDir,
  pathTemplateDir,
  pathVideoDir
}

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
export function constructClipboardApi(permissions: ClipboardPermission[]): IClipboardServer {
  return {
    clipboardReadText: checkPermission<ClipboardPermission>(
      ['clipboard:read-text', 'clipboard:read-all'],
      permissions
    )(clipboard.readText),
    clipboardWriteText: checkPermission<ClipboardPermission>(
      ['clipboard:write-text', 'clipboard:write-all'],
      permissions
    )(clipboard.writeText),
    clipboardReadImageBase64: checkPermission<ClipboardPermission>(
      ['clipboard:read-all', 'clipboard:read-image'],
      permissions
    )(clipboard.readImageBase64),
    clipboardReadImageBinary: checkPermission<ClipboardPermission>(
      ['clipboard:read-all', 'clipboard:read-image'],
      permissions
    )(clipboard.readImageBinary),
    clipboardWriteImageBase64: checkPermission<ClipboardPermission>(
      ['clipboard:write-all', 'clipboard:write-image'],
      permissions
    )(clipboard.writeImageBase64),
    clipboardWriteImageBinary: checkPermission<ClipboardPermission>(
      ['clipboard:write-all', 'clipboard:write-image'],
      permissions
    )(clipboard.writeImageBinary),
    clipboardReadFiles: checkPermission<ClipboardPermission>(
      ['clipboard:read-all', 'clipboard:read-files'],
      permissions
    )(clipboard.readFiles),
    clipboardWriteFiles: checkPermission<ClipboardPermission>(
      ['clipboard:write-all', 'clipboard:write-files'],
      permissions
    )(clipboard.writeFiles),
    clipboardReadRtf: checkPermission<ClipboardPermission>(
      ['clipboard:read-all', 'clipboard:read-text'],
      permissions
    )(clipboard.readRtf),
    clipboardWriteRtf: checkPermission<ClipboardPermission>(
      ['clipboard:write-all', 'clipboard:write-text'],
      permissions
    )(clipboard.writeRtf),
    clipboardReadHtml: checkPermission<ClipboardPermission>(
      ['clipboard:read-all', 'clipboard:read-text'],
      permissions
    )(clipboard.readHtml),
    clipboardWriteHtml: checkPermission<ClipboardPermission>(
      ['clipboard:write-all', 'clipboard:write-text'],
      permissions
    )(clipboard.writeHtml),
    clipboardWriteHtmlAndText: checkPermission<ClipboardPermission>(
      ['clipboard:write-all', 'clipboard:write-text'],
      permissions
    )(clipboard.writeHtmlAndText),
    clipboardHasText: checkPermission<ClipboardPermission>([], permissions)(clipboard.hasText),
    clipboardHasRTF: checkPermission<ClipboardPermission>([], permissions)(clipboard.hasRTF),
    clipboardHasHTML: checkPermission<ClipboardPermission>([], permissions)(clipboard.hasHTML),
    clipboardHasImage: checkPermission<ClipboardPermission>([], permissions)(clipboard.hasImage),
    clipboardHasFiles: checkPermission<ClipboardPermission>([], permissions)(clipboard.hasFiles)
    // clipboardStartMonitor: checkPermission<ClipboardPermissions>([], permissions)(clipboard.startMonitor)
  }
}
export const defaultClipboardApi = constructClipboardApi(['clipboard:read-all', 'clipboard:write-all'])

/* -------------------------------------------------------------------------- */
/*                                   Dialog                                   */
/* -------------------------------------------------------------------------- */
export function constructDialogApi(permissions: DialogPermission[]): IDialogServer {
  return {
    dialogAsk: checkPermission<DialogPermission>(['dialog:all'], permissions)(dialogAsk),
    dialogConfirm: checkPermission<DialogPermission>(['dialog:all'], permissions)(dialogConfirm),
    dialogMessage: checkPermission<DialogPermission>(['dialog:all'], permissions)(dialogMessage),
    dialogOpen: checkPermission<DialogPermission>(['dialog:all'], permissions)(dialogOpen),
    dialogSave: checkPermission<DialogPermission>(['dialog:all'], permissions)(dialogSave)
  }
}
export const defaultDialogApi = constructDialogApi(['dialog:all'])

/* -------------------------------------------------------------------------- */
/*                                Notification                                */
/* -------------------------------------------------------------------------- */

export function constructNotificationApi(permissions: NotificationPermission[]): INotificationServer {
  return {
    notificationIsPermissionGranted: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationIsPermissionGranted),
    notificationRequestPermission: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationRequestPermission),
    notificationSendNotification: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationSendNotification),
    notificationRegisterActionTypes: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationRegisterActionTypes),
    notificationPending: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationPending),
    notificationCancel: checkPermission<NotificationPermission>(['notification:all'], permissions)(notificationCancel),
    notificationCancelAll: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationCancelAll),
    notificationActive: checkPermission<NotificationPermission>(['notification:all'], permissions)(notificationActive),
    notificationRemoveActive: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationRemoveActive),
    notificationRemoveAllActive: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationRemoveAllActive),
    notificationCreateChannel: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationCreateChannel),
    notificationRemoveChannel: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationRemoveChannel),
    notificationChannels: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationChannels),
    notificationOnNotificationReceived: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationOnNotificationReceived),
    notificationOnAction: checkPermission<NotificationPermission>(
      ['notification:all'],
      permissions
    )(notificationOnAction)
  }
}

export const defaultNotificationApi = constructNotificationApi(['notification:all'])

/* -------------------------------------------------------------------------- */
/*                                 File System                                */
/* -------------------------------------------------------------------------- */
export function constructFsApi(permissions: FsPermission[]): IFsServer {
  return {
    fsReadDir: checkPermission<FsPermission>(['fs:read'], permissions)(fsReadDir),
    fsReadFile: checkPermission<FsPermission>(['fs:read'], permissions)(fsReadFile),
    fsReadTextFile: checkPermission<FsPermission>(['fs:read'], permissions)(fsReadTextFile),
    fsStat: checkPermission<FsPermission>(['fs:read'], permissions)(fsStat),
    fsLstat: checkPermission<FsPermission>(['fs:read'], permissions)(fsLstat),
    fsExists: checkPermission<FsPermission>(['fs:read', 'fs:exists'], permissions)(fsExists),
    fsMkdir: checkPermission<FsPermission>(['fs:write'], permissions)(fsMkdir),
    fsCreate: checkPermission<FsPermission>(['fs:write'], permissions)(fsCreate),
    fsCopyFile: checkPermission<FsPermission>(['fs:write'], permissions)(fsCopyFile),
    fsRemove: checkPermission<FsPermission>(['fs:write'], permissions)(fsRemove),
    fsRename: checkPermission<FsPermission>(['fs:write'], permissions)(fsRename),
    fsTruncate: checkPermission<FsPermission>(['fs:write'], permissions)(fsTruncate),
    fsWriteFile: checkPermission<FsPermission>(['fs:write'], permissions)(fsWriteFile),
    fsWriteTextFile: checkPermission<FsPermission>(['fs:write'], permissions)(fsWriteTextFile)
  }
}
export const defaultFsApi = constructFsApi(['fs:read', 'fs:write'])
/* -------------------------------------------------------------------------- */
/*                                     OS                                     */
/* -------------------------------------------------------------------------- */
export function constructOsApi(permissions: OsPermission[]): IOsServer {
  return {
    osPlatform: checkPermission<OsPermission>(['os:all'], permissions)(osPlatform),
    osArch: checkPermission<OsPermission>(['os:all'], permissions)(osArch),
    osExeExtension: checkPermission<OsPermission>(['os:all'], permissions)(osExeExtension),
    osFamily: checkPermission<OsPermission>(['os:all'], permissions)(osFamily),
    osHostname: checkPermission<OsPermission>(['os:all'], permissions)(osHostname),
    osEol: checkPermission<OsPermission>(['os:all'], permissions)(() => Promise.resolve(osEol())),
    osVersion: checkPermission<OsPermission>(['os:all'], permissions)(osVersion),
    osLocale: checkPermission<OsPermission>(['os:all'], permissions)(osLocale)
  }
}

export const defaultOsApi = constructOsApi(['os:all'])

/* -------------------------------------------------------------------------- */
/*                                    Shell                                   */
/* -------------------------------------------------------------------------- */
export function constructShellApi(permissions: ShellPermission[]): IShellServer {
  return {
    shellExecute: checkPermission<ShellPermission>(
      ['shell:execute'],
      permissions
    )(
      (program: string, args: string[], options: InternalSpawnOptions): Promise<ChildProcess<IOPayload>> =>
        invoke<ChildProcess<IOPayload>>('plugin:shellx|execute', {
          program: program,
          args: args,
          options: options
        })
    ),
    shellKill: checkPermission<ShellPermission>(
      ['shell:execute'],
      permissions
    )((pid: number) =>
      invoke<void>('plugin:shellx|kill', {
        cmd: 'killChild',
        pid: pid
      })
    ),
    shellStdinWrite: checkPermission<ShellPermission>(
      ['shell:execute'],
      permissions
    )((buffer: string | number[], pid: number) =>
      invoke('plugin:shellx|stdin_write', {
        buffer: buffer,
        pid: pid
      })
    ),
    shellOpen: checkPermission<ShellPermission>(['shell:open'], permissions)(shellOpen),
    shellRawSpawn: checkPermission<ShellPermission>(
      ['shell:execute'],
      permissions
    )(
      <O extends IOPayload>(
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
      }
    ),
    shellExecuteBashScript: checkPermission<ShellPermission>(['shell:execute'], permissions)(shellExecuteBashScript),
    shellExecutePowershellScript: checkPermission<ShellPermission>(
      ['shell:execute'],
      permissions
    )(shellExecutePowershellScript),
    shellExecuteAppleScript: checkPermission<ShellPermission>(['shell:execute'], permissions)(shellExecuteAppleScript),
    shellExecutePythonScript: checkPermission<ShellPermission>(
      ['shell:execute'],
      permissions
    )(shellExecutePythonScript),
    shellExecuteZshScript: checkPermission<ShellPermission>(['shell:execute'], permissions)(shellExecuteZshScript),
    shellExecuteNodeScript: checkPermission<ShellPermission>(['shell:execute'], permissions)(shellExecuteNodeScript),
    shellHasCommand: checkPermission<ShellPermission>(['shell:execute'], permissions)(shellHasCommand),
    shellLikelyOnWindows: checkPermission<ShellPermission>(['shell:execute'], permissions)(shellLikelyOnWindows)
  }
}

export const defaultShellApi = constructShellApi(['shell:open', 'shell:execute'])

/* -------------------------------------------------------------------------- */
/*                                    Fetch                                   */
/* -------------------------------------------------------------------------- */

export function constructFetchApi(permissions: FetchPermission[]): IFetchServer {
  return {
    fetchRawFetch: checkPermission<FetchPermission>(
      ['fetch:all'],
      permissions
    )((options: FetchOptions) => invoke<number>('plugin:http|fetch', options)),
    fetchFetchCancel: checkPermission<FetchPermission>(
      ['fetch:all'],
      permissions
    )((rid: number) => invoke<void>('plugin:http|fetch_cancel', { rid })),
    fetchFetchSend: checkPermission<FetchPermission>(
      ['fetch:all'],
      permissions
    )((rid: number) => invoke<FetchSendResponse>('plugin:http|fetch_send', { rid })),
    fetchFetchReadBody: checkPermission<FetchPermission>(
      ['fetch:all'],
      permissions
    )((rid: number) => invoke<ArrayBuffer | number[]>('plugin:http|fetch_read_body', { rid }))
  }
}
export const defaultFetchApi = constructFetchApi(['fetch:all'])

/* -------------------------------------------------------------------------- */
/*                                 System Info                                */
/* -------------------------------------------------------------------------- */
export function constructSystemInfoApi(permissions: SystemInfoPermission[]): ISystemInfoServer {
  return {
    sysInfoAllSysInfo: checkPermission<SystemInfoPermission>(['system-info:all'], permissions)(sysInfoAllSysInfo),
    sysInfoTotalMemory: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:memory'],
      permissions
    )(sysInfoTotalMemory),
    sysInfoUsedMemory: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:memory'],
      permissions
    )(sysInfoUsedMemory),
    sysInfoTotalSwap: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:memory'],
      permissions
    )(sysInfoTotalSwap),
    sysInfoUsedSwap: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:memory'],
      permissions
    )(sysInfoUsedSwap),
    sysInfoMemoryInfo: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:memory'],
      permissions
    )(sysInfoMemoryInfo),
    sysInfoHostname: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:network'],
      permissions
    )(sysInfoHostname),
    sysInfoName: checkPermission<SystemInfoPermission>(['system-info:all', 'system-info:os'], permissions)(sysInfoName),
    sysInfoKernelVersion: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:os'],
      permissions
    )(sysInfoKernelVersion),
    sysInfoOsVersion: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:os'],
      permissions
    )(sysInfoOsVersion),
    sysInfoStaticInfo: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:os'],
      permissions
    )(sysInfoStaticInfo),
    sysInfoComponents: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:components'],
      permissions
    )(sysInfoComponents),
    sysInfoCpus: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:cpu'],
      permissions
    )(sysInfoCpus),
    sysInfoCpuCount: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:cpu'],
      permissions
    )(sysInfoCpuCount),
    sysInfoCpuInfo: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:cpu'],
      permissions
    )(sysInfoCpuInfo),
    sysInfoDisks: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:disk'],
      permissions
    )(sysInfoDisks),
    sysInfoNetworks: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:network'],
      permissions
    )(sysInfoNetworks),
    sysInfoProcesses: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:process'],
      permissions
    )(sysInfoProcesses),
    sysInfoRefreshAll: checkPermission<SystemInfoPermission>(['system-info:all'], permissions)(sysInfoRefreshAll),
    sysInfoRefreshMemory: checkPermission<SystemInfoPermission>(
      ['system-info:memory'],
      permissions
    )(sysInfoRefreshMemory),
    sysInfoRefreshCpu: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:cpu'],
      permissions
    )(sysInfoRefreshCpu),
    sysInfoRefreshProcesses: checkPermission<SystemInfoPermission>(
      ['system-info:process'],
      permissions
    )(sysInfoRefreshProcesses),
    // sysInfoDebugCommand: checkPermission<SystemInfoPermission>(['system-info:all', 'system-info:all'], permissions)(sysInfoDebugCommand),
    sysInfoBatteries: checkPermission<SystemInfoPermission>(
      ['system-info:all', 'system-info:battery'],
      permissions
    )(sysInfoBatteries)
  }
}
export const defaultSystemInfoApi = constructSystemInfoApi(['system-info:all'])

/* -------------------------------------------------------------------------- */
/*                                   Network                                  */
/* -------------------------------------------------------------------------- */
export function constructNetworkApi(permissions: NetworkPermission[]): INetworkServer {
  return {
    networkGetInterfaces: checkPermission<NetworkPermission>(['network:interface'], permissions)(networkGetInterfaces),
    networkGetNonEmptyInterfaces: checkPermission<NetworkPermission>(
      ['network:interface'],
      permissions
    )(networkGetNonEmptyInterfaces),
    networkFindAvailablePort: checkPermission<NetworkPermission>(
      ['network:port'],
      permissions
    )(networkFindAvailablePort),
    networkIsPortTaken: checkPermission<NetworkPermission>(['network:port'], permissions)(networkIsPortTaken),
    networkIsHttpPortOpen: checkPermission<NetworkPermission>(['network:port'], permissions)(networkIsHttpPortOpen)
    // networkScanOnlineIpPortPairs,
    // networkScanOnlineIpsByPort,
    // networkNonLocalhostNetworks,
    // networkLocalServerIsRunning,
    // networkScanLocalNetworkOnlineHostsByPort
  }
}

export const defaultNetworkApi = constructNetworkApi(['network:interface', 'network:port'])

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
  ...defaultDialogApi,
  ...defaultNotificationApi,
  ...defaultFsApi,
  ...defaultOsApi,
  ...defaultShellApi,
  ...defaultFetchApi,
  ...defaultSystemInfoApi,
  ...defaultNetworkApi,
  ...eventApi,
  ...pathApi,
  ...loggerApi,
  ...defaultUpdownloadApi
}

export function constructServerAPIWithPermissions(permissions: AllPermission[]): IFullAPI {
  const apis = [
    constructClipboardApi(permissions.filter((p) => p.startsWith('clipboard:')) as ClipboardPermission[]),
    constructDialogApi(permissions.filter((p) => p.startsWith('dialog:')) as DialogPermission[]),
    constructNotificationApi(permissions.filter((p) => p.startsWith('notification:')) as NotificationPermission[]),
    constructFsApi(permissions.filter((p) => p.startsWith('fs:')) as FsPermission[]),
    constructOsApi(permissions.filter((p) => p.startsWith('os:')) as OsPermission[]),
    constructShellApi(permissions.filter((p) => p.startsWith('shell:')) as ShellPermission[]),
    constructFetchApi(permissions.filter((p) => p.startsWith('fetch:')) as FetchPermission[]),
    constructSystemInfoApi(permissions.filter((p) => p.startsWith('system-info:')) as SystemInfoPermission[]),
    constructNetworkApi(permissions.filter((p) => p.startsWith('network:')) as NetworkPermission[]),
    constructUpdownloadApi(permissions.filter((p) => p.startsWith('updownload:')) as UpdownloadPermission[])
  ]
  return Object.assign({}, ...apis)
}
