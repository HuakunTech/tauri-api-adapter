/**
 * This file is the server-side implementation of Tauri API Adapter
 * Code from here should run in regular Tauri webview environment, not iframe or web worker. i.e. needs access to Tauri APIs (invoke is called here)
 * Client from iframe or web worker can call APIs exposed from here
 */
import { FetchOptions, FetchSendResponse } from '@/api/fetch/types'
import { Channel, invoke, transformCallback } from '@tauri-apps/api/core'
import * as _event from '@tauri-apps/api/event'
import * as dialog from '@tauri-apps/plugin-dialog'
import * as fs from '@tauri-apps/plugin-fs'
import * as notification from '@tauri-apps/plugin-notification'
import * as os from '@tauri-apps/plugin-os'
import * as clipboard from 'tauri-plugin-clipboard-api'
import * as network from 'tauri-plugin-network-api'
import * as shellx from 'tauri-plugin-shellx-api'
import * as sysInfo from 'tauri-plugin-system-info-api'
import {
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

/* -------------------------------------------------------------------------- */
/*                                    Event                                   */
/* -------------------------------------------------------------------------- */
export const eventApi: IEventServer = {
  eventRawListen<T>(
    event: _event.EventName,
    target: _event.EventTarget,
    handler: _event.EventCallback<T>
  ): Promise<number> {
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
  eventEmit: _event.emit,
  eventEmitTo: _event.emitTo,
  eventOnce: _event.once
}

/* -------------------------------------------------------------------------- */
/*                                  Clipboard                                 */
/* -------------------------------------------------------------------------- */
export const clipboardApi: IClipboardServer = {
  clipboardReadText: clipboard.readText,
  clipboardWriteText: clipboard.writeText,
  clipboardReadImageBase64: clipboard.readImageBase64,
  clipboardReadImageBinary: clipboard.readImageBinary,
  clipboardWriteImageBase64: clipboard.writeImageBase64,
  clipboardWriteImageBinary: clipboard.writeImageBinary,
  clipboardReadFiles: clipboard.readFiles,
  clipboardWriteFiles: clipboard.writeFiles,
  clipboardReadRtf: clipboard.readRtf,
  clipboardWriteRtf: clipboard.writeRtf,
  clipboardReadHtml: clipboard.readHtml,
  clipboardWriteHtml: clipboard.writeHtml,
  clipboardWriteHtmlAndText: clipboard.writeHtmlAndText,
  clipboardHasText: clipboard.hasText,
  clipboardHasRTF: clipboard.hasRTF,
  clipboardHasHTML: clipboard.hasHTML,
  clipboardHasImage: clipboard.hasImage,
  clipboardHasFiles: clipboard.hasFiles,
  clipboardStartMonitor: clipboard.startMonitor
}

/* -------------------------------------------------------------------------- */
/*                                   Dialog                                   */
/* -------------------------------------------------------------------------- */
export const dialogApi: IDialogServer = {
  dialogAsk: dialog.ask,
  dialogConfirm: dialog.confirm,
  dialogMessage: dialog.message,
  dialogOpen: dialog.open,
  dialogSave: dialog.save
}

/* -------------------------------------------------------------------------- */
/*                                Notification                                */
/* -------------------------------------------------------------------------- */
export const notificationApi: INotificationServer = {
  notificationIsPermissionGranted: notification.isPermissionGranted,
  notificationRequestPermission: notification.requestPermission,
  notificationSendNotification: notification.sendNotification,
  notificationRegisterActionTypes: notification.registerActionTypes,
  notificationPending: notification.pending,
  notificationCancel: notification.cancel,
  notificationCancelAll: notification.cancelAll,
  notificationActive: notification.active,
  notificationRemoveActive: notification.removeActive,
  notificationRemoveAllActive: notification.removeAllActive,
  notificationCreateChannel: notification.createChannel,
  notificationRemoveChannel: notification.removeChannel,
  notificationChannels: notification.channels,
  notificationOnNotificationReceived: notification.onNotificationReceived,
  notificationOnAction: notification.onAction
}

/* -------------------------------------------------------------------------- */
/*                                 File System                                */
/* -------------------------------------------------------------------------- */
export const fsApi: IFsServer = {
  fsReadDir: fs.readDir,
  fsReadFile: fs.readFile,
  fsReadTextFile: fs.readTextFile,
  fsStat: fs.stat,
  fsLstat: fs.lstat,
  fsExists: fs.exists,
  fsMkdir: fs.mkdir,
  fsCreate: fs.create,
  fsCopyFile: fs.copyFile,
  fsRemove: fs.remove,
  fsRename: fs.rename,
  fsTruncate: fs.truncate,
  fsWriteFile: fs.writeFile,
  fsWriteTextFile: fs.writeTextFile
}

/* -------------------------------------------------------------------------- */
/*                                     OS                                     */
/* -------------------------------------------------------------------------- */
export const osApi: IOsServer = {
  osPlatform: os.platform,
  osArch: os.arch,
  osExeExtension: os.exeExtension,
  osFamily: os.family,
  osHostname: os.hostname,
  osEol: () => Promise.resolve(os.eol()),
  osVersion: os.version,
  osLocale: os.locale
}

/* -------------------------------------------------------------------------- */
/*                                    Shell                                   */
/* -------------------------------------------------------------------------- */
export const shellApi: IShellServer = {
  shellExecute: (
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions
  ): Promise<shellx.ChildProcess<shellx.IOPayload>> =>
    invoke<shellx.ChildProcess<shellx.IOPayload>>('plugin:shellx|execute', {
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
  shellOpen: shellx.open,
  shellRawSpawn: <O extends shellx.IOPayload>(
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions,
    cb: (evt: shellx.CommandEvent<O>) => void
  ): Promise<number> => {
    const onEvent = new Channel<shellx.CommandEvent<O>>()
    onEvent.onmessage = cb
    return invoke<number>('plugin:shellx|spawn', {
      program: program,
      args: args,
      options: options,
      onEvent
    })
  },
  shellExecuteBashScript: shellx.executeBashScript,
  shellExecutePowershellScript: shellx.executePowershellScript,
  shellExecuteAppleScript: shellx.executeAppleScript,
  shellExecutePythonScript: shellx.executePythonScript,
  shellExecuteZshScript: shellx.executeZshScript,
  shellExecuteNodeScript: shellx.executeNodeScript,
  shellHasCommand: shellx.hasCommand,
  shellLikelyOnWindows: shellx.likelyOnWindows
}

/* -------------------------------------------------------------------------- */
/*                                    Fetch                                   */
/* -------------------------------------------------------------------------- */
export const fetchApi: IFetchServer = {
  fetchRawFetch: (options: FetchOptions) => invoke<number>('plugin:http|fetch', options),
  fetchFetchCancel: (rid: number) => invoke<void>('plugin:http|fetch_cancel', { rid }),
  fetchFetchSend: (rid: number) => invoke<FetchSendResponse>('plugin:http|fetch_send', { rid }),
  fetchFetchReadBody: (rid: number) =>
    invoke<ArrayBuffer | number[]>('plugin:http|fetch_read_body', { rid })
}

/* -------------------------------------------------------------------------- */
/*                                 System Info                                */
/* -------------------------------------------------------------------------- */
export const systemInfoAPI: ISystemInfoServer = {
  sysInfoAllSysInfo: sysInfo.allSysInfo,
  sysInfoTotalMemory: sysInfo.totalMemory,
  sysInfoUsedMemory: sysInfo.usedMemory,
  sysInfoTotalSwap: sysInfo.totalSwap,
  sysInfoUsedSwap: sysInfo.usedSwap,
  sysInfoMemoryInfo: sysInfo.memoryInfo,
  sysInfoHostname: sysInfo.hostname,
  sysInfoName: sysInfo.name,
  sysInfoKernelVersion: sysInfo.kernelVersion,
  sysInfoOsVersion: sysInfo.osVersion,
  sysInfoStaticInfo: sysInfo.staticInfo,
  sysInfoComponents: sysInfo.components,
  sysInfoCpus: sysInfo.cpus,
  sysInfoCpuCount: sysInfo.cpuCount,
  sysInfoCpuInfo: sysInfo.cpuInfo,
  sysInfoDisks: sysInfo.disks,
  sysInfoNetworks: sysInfo.networks,
  sysInfoProcesses: sysInfo.processes,
  sysInfoRefreshAll: sysInfo.refreshAll,
  sysInfoRefreshMemory: sysInfo.refreshMemory,
  sysInfoRefreshCpu: sysInfo.refreshCpu,
  sysInfoRefreshProcesses: sysInfo.refreshProcesses,
  sysInfoDebugCommand: sysInfo.debugCommand,
  sysInfoBatteries: sysInfo.batteries
}

/* -------------------------------------------------------------------------- */
/*                                   Network                                  */
/* -------------------------------------------------------------------------- */
export const networkAPI: INetworkServer = {
  networkGetInterfaces: network.getInterfaces,
  networkGetNonEmptyInterfaces: network.getNonEmptyInterfaces,
  networkFindAvailablePort: network.findAvailablePort,
  networkIsPortTaken: network.isPortTaken,
  networkIsHttpPortOpen: network.isHttpPortOpen,
  networkScanOnlineIpPortPairs: network.scanOnlineIpPortPairs,
  networkScanOnlineIpsByPort: network.scanOnlineIpsByPort,
  networkNonLocalhostNetworks: network.nonLocalhostNetworks,
  networkLocalServerIsRunning: network.localServerIsRunning,
  networkScanLocalNetworkOnlineHostsByPort: network.scanLocalNetworkOnlineHostsByPort
}

export const defaultServerAPI: IFullAPI = {
  ...clipboardApi,
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
