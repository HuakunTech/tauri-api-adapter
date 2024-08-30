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
  ClipboardPermissionMap,
  DialogPermissionMap,
  FetchPermissionMap,
  FsPermissionMap,
  NotificationPermissionMap,
  OsPermissionMap,
  ShellPermissionMap,
  SystemInfoPermissionMap,
  UpdownloadPermissionMap,
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

/* ---------------------------------------------------------shellExecuteZshScript
shellExecuteNodeScript
shellHasCommand
shellLikelyOnWindows----------------- */
/*                               Upload Download                              */
/* -------------------------------------------------------------------------- */
export function constructUpdownloadApi(permissions: UpdownloadPermission[]): IUpdownloadServer {
  return {
    upload: checkPermission<UpdownloadPermission>(UpdownloadPermissionMap.upload, permissions)(upload),
    download: checkPermission<UpdownloadPermission>(UpdownloadPermissionMap.download, permissions)(download)
  }
}
export const defaultUpdownloadApi = constructUpdownloadApi(['updownload:upload', 'updownload:download'])
/* -------------------------------------------------------------------------- */
/*                                   Logger                                   */
/* -------------------------------------------------------------------------- */
export function constructLoggerApi(): ILoggerServer {
  return {
    loggerDebug,
    loggerError,
    loggerInfo,
    loggerTrace,
    loggerWarn
  }
}
export const defaultLoggerApi = constructLoggerApi()

/* -------------------------------------------------------------------------- */
/*                                    Path                                    */
/* -------------------------------------------------------------------------- */
export function constructPathApi(): IPathServer {
  return {
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
}
export const defaultPathApi: IPathServer = constructPathApi()

/* -------------------------------------------------------------------------- */
/*                                    Event                                   */
/* -------------------------------------------------------------------------- */
export function constructEventApi(): IEventServer {
  return {
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
}
export const defaultEventApi: IEventServer = constructEventApi()
/* -------------------------------------------------------------------------- */
/*                                  Clipboard                                 */
/* -------------------------------------------------------------------------- */
export function constructClipboardApi(permissions: ClipboardPermission[]): IClipboardServer {
  return {
    clipboardReadText: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardReadText,
      permissions
    )(clipboard.readText),
    clipboardWriteText: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardWriteText,
      permissions
    )(clipboard.writeText),
    clipboardReadImageBase64: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardReadImageBase64,
      permissions
    )(clipboard.readImageBase64),
    clipboardReadImageBinary: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardReadImageBinary,
      permissions
    )(clipboard.readImageBinary),
    clipboardWriteImageBase64: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardWriteImageBase64,
      permissions
    )(clipboard.writeImageBase64),
    clipboardWriteImageBinary: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardWriteImageBinary,
      permissions
    )(clipboard.writeImageBinary),
    clipboardReadFiles: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardReadFiles,
      permissions
    )(clipboard.readFiles),
    clipboardWriteFiles: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardWriteFiles,
      permissions
    )(clipboard.writeFiles),
    clipboardReadRtf: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardReadRtf,
      permissions
    )(clipboard.readRtf),
    clipboardWriteRtf: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardWriteRtf,
      permissions
    )(clipboard.writeRtf),
    clipboardReadHtml: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardReadHtml,
      permissions
    )(clipboard.readHtml),
    clipboardWriteHtml: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardWriteHtml,
      permissions
    )(clipboard.writeHtml),
    clipboardWriteHtmlAndText: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardWriteHtmlAndText,
      permissions
    )(clipboard.writeHtmlAndText),
    clipboardHasText: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardHasText,
      permissions
    )(clipboard.hasText),
    clipboardHasRTF: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardHasRTF,
      permissions
    )(clipboard.hasRTF),
    clipboardHasHTML: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardHasHTML,
      permissions
    )(clipboard.hasHTML),
    clipboardHasImage: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardHasImage,
      permissions
    )(clipboard.hasImage),
    clipboardHasFiles: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.clipboardHasFiles,
      permissions
    )(clipboard.hasFiles)
    // clipboardStartMonitor: checkPermission<ClipboardPermissions>([], permissions)(clipboard.startMonitor)
  }
}
export const defaultClipboardApi = constructClipboardApi(['clipboard:read-all', 'clipboard:write-all'])

/* -------------------------------------------------------------------------- */
/*                                   Dialog                                   */
/* -------------------------------------------------------------------------- */
export function constructDialogApi(permissions: DialogPermission[]): IDialogServer {
  return {
    dialogAsk: checkPermission<DialogPermission>(DialogPermissionMap.dialogAsk, permissions)(dialogAsk),
    dialogConfirm: checkPermission<DialogPermission>(DialogPermissionMap.dialogConfirm, permissions)(dialogConfirm),
    dialogMessage: checkPermission<DialogPermission>(DialogPermissionMap.dialogMessage, permissions)(dialogMessage),
    dialogOpen: checkPermission<DialogPermission>(DialogPermissionMap.dialogOpen, permissions)(dialogOpen),
    dialogSave: checkPermission<DialogPermission>(DialogPermissionMap.dialogSave, permissions)(dialogSave)
  }
}
export const defaultDialogApi = constructDialogApi(['dialog:all'])

/* -------------------------------------------------------------------------- */
/*                                Notification                                */
/* -------------------------------------------------------------------------- */

export function constructNotificationApi(permissions: NotificationPermission[]): INotificationServer {
  return {
    notificationIsPermissionGranted: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationIsPermissionGranted,
      permissions
    )(notificationIsPermissionGranted),
    notificationRequestPermission: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationRequestPermission,
      permissions
    )(notificationRequestPermission),
    notificationSendNotification: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationSendNotification,
      permissions
    )(notificationSendNotification),
    notificationRegisterActionTypes: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationRegisterActionTypes,
      permissions
    )(notificationRegisterActionTypes),
    notificationPending: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationPending,
      permissions
    )(notificationPending),
    notificationCancel: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationCancel,
      permissions
    )(notificationCancel),
    notificationCancelAll: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationCancelAll,
      permissions
    )(notificationCancelAll),
    notificationActive: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationActive,
      permissions
    )(notificationActive),
    notificationRemoveActive: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationRemoveActive,
      permissions
    )(notificationRemoveActive),
    notificationRemoveAllActive: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationRemoveAllActive,
      permissions
    )(notificationRemoveAllActive),
    notificationCreateChannel: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationCreateChannel,
      permissions
    )(notificationCreateChannel),
    notificationRemoveChannel: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationRemoveChannel,
      permissions
    )(notificationRemoveChannel),
    notificationChannels: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationChannels,
      permissions
    )(notificationChannels),
    notificationOnNotificationReceived: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationOnNotificationReceived,
      permissions
    )(notificationOnNotificationReceived),
    notificationOnAction: checkPermission<NotificationPermission>(
      NotificationPermissionMap.notificationOnAction,
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
    fsReadDir: checkPermission<FsPermission>(FsPermissionMap.fsReadDir, permissions)(fsReadDir),
    fsReadFile: checkPermission<FsPermission>(FsPermissionMap.fsReadFile, permissions)(fsReadFile),
    fsReadTextFile: checkPermission<FsPermission>(FsPermissionMap.fsReadTextFile, permissions)(fsReadTextFile),
    fsStat: checkPermission<FsPermission>(FsPermissionMap.fsStat, permissions)(fsStat),
    fsLstat: checkPermission<FsPermission>(FsPermissionMap.fsLstat, permissions)(fsLstat),
    fsExists: checkPermission<FsPermission>(FsPermissionMap.fsExists, permissions)(fsExists),
    fsMkdir: checkPermission<FsPermission>(FsPermissionMap.fsMkdir, permissions)(fsMkdir),
    fsCreate: checkPermission<FsPermission>(FsPermissionMap.fsCreate, permissions)(fsCreate),
    fsCopyFile: checkPermission<FsPermission>(FsPermissionMap.fsCopyFile, permissions)(fsCopyFile),
    fsRemove: checkPermission<FsPermission>(FsPermissionMap.fsRemove, permissions)(fsRemove),
    fsRename: checkPermission<FsPermission>(FsPermissionMap.fsRename, permissions)(fsRename),
    fsTruncate: checkPermission<FsPermission>(FsPermissionMap.fsTruncate, permissions)(fsTruncate),
    fsWriteFile: checkPermission<FsPermission>(FsPermissionMap.fsWriteFile, permissions)(fsWriteFile),
    fsWriteTextFile: checkPermission<FsPermission>(FsPermissionMap.fsWriteTextFile, permissions)(fsWriteTextFile)
  }
}
export const defaultFsApi = constructFsApi(['fs:read', 'fs:write'])
/* -------------------------------------------------------------------------- */
/*                                     OS                                     */
/* -------------------------------------------------------------------------- */
export function constructOsApi(permissions: OsPermission[]): IOsServer {
  return {
    // platform doesn't require any permission because the UI API relies on this to implement window dragging
    osPlatform: checkPermission<OsPermission>(
      OsPermissionMap.osPlatform,
      permissions
    )(() => Promise.resolve(osPlatform())),
    osArch: checkPermission<OsPermission>(OsPermissionMap.osArch, permissions)(() => Promise.resolve(osArch())),
    osExeExtension: checkPermission<OsPermission>(
      OsPermissionMap.osExeExtension,
      permissions
    )(() => Promise.resolve(osExeExtension())),
    osFamily: checkPermission<OsPermission>(OsPermissionMap.osFamily, permissions)(() => Promise.resolve(osFamily())),
    osHostname: checkPermission<OsPermission>(OsPermissionMap.osHostname, permissions)(osHostname),
    osEol: checkPermission<OsPermission>(OsPermissionMap.osEol, permissions)(() => Promise.resolve(osEol())),
    osVersion: checkPermission<OsPermission>(
      OsPermissionMap.osVersion,
      permissions
    )(() => Promise.resolve(osVersion())),
    osLocale: checkPermission<OsPermission>(OsPermissionMap.osLocale, permissions)(osLocale)
  }
}

export const defaultOsApi = constructOsApi(['os:all'])

/* -------------------------------------------------------------------------- */
/*                                    Shell                                   */
/* -------------------------------------------------------------------------- */
export function constructShellApi(permissions: ShellPermission[]): IShellServer {
  return {
    shellExecute: checkPermission<ShellPermission>(
      ShellPermissionMap.shellExecute,
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
      ShellPermissionMap.shellKill,
      permissions
    )((pid: number) =>
      invoke<void>('plugin:shellx|kill', {
        cmd: 'killChild',
        pid: pid
      })
    ),
    shellStdinWrite: checkPermission<ShellPermission>(
      ShellPermissionMap.shellStdinWrite,
      permissions
    )((buffer: string | number[], pid: number) =>
      invoke('plugin:shellx|stdin_write', {
        buffer: buffer,
        pid: pid
      })
    ),
    shellOpen: checkPermission<ShellPermission>(['shell:open'], permissions)(shellOpen),
    shellRawSpawn: checkPermission<ShellPermission>(
      ShellPermissionMap.shellRawSpawn,
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
    shellExecuteBashScript: checkPermission<ShellPermission>(
      ShellPermissionMap.shellExecuteBashScript,
      permissions
    )(shellExecuteBashScript),
    shellExecutePowershellScript: checkPermission<ShellPermission>(
      ShellPermissionMap.shellExecutePowershellScript,
      permissions
    )(shellExecutePowershellScript),
    shellExecuteAppleScript: checkPermission<ShellPermission>(
      ShellPermissionMap.shellExecuteAppleScript,
      permissions
    )(shellExecuteAppleScript),
    shellExecutePythonScript: checkPermission<ShellPermission>(
      ShellPermissionMap.shellExecutePythonScript,
      permissions
    )(shellExecutePythonScript),
    shellExecuteZshScript: checkPermission<ShellPermission>(
      ShellPermissionMap.shellExecuteZshScript,
      permissions
    )(shellExecuteZshScript),
    shellExecuteNodeScript: checkPermission<ShellPermission>(
      ShellPermissionMap.shellExecuteNodeScript,
      permissions
    )(shellExecuteNodeScript),
    shellHasCommand: checkPermission<ShellPermission>(ShellPermissionMap.shellHasCommand, permissions)(shellHasCommand),
    shellLikelyOnWindows: checkPermission<ShellPermission>(
      ShellPermissionMap.shellLikelyOnWindows,
      permissions
    )(shellLikelyOnWindows)
  }
}

export const defaultShellApi = constructShellApi(['shell:open', 'shell:execute'])

/* -------------------------------------------------------------------------- */
/*                                    Fetch                                   */
/* -------------------------------------------------------------------------- */

export function constructFetchApi(permissions: FetchPermission[]): IFetchServer {
  return {
    fetchRawFetch: checkPermission<FetchPermission>(
      FetchPermissionMap.fetchRawFetch,
      permissions
    )((options: FetchOptions) => invoke<number>('plugin:http|fetch', options)),
    fetchFetchCancel: checkPermission<FetchPermission>(
      FetchPermissionMap.fetchFetchCancel,
      permissions
    )((rid: number) => invoke<void>('plugin:http|fetch_cancel', { rid })),
    fetchFetchSend: checkPermission<FetchPermission>(
      FetchPermissionMap.fetchFetchSend,
      permissions
    )((rid: number) => invoke<FetchSendResponse>('plugin:http|fetch_send', { rid })),
    fetchFetchReadBody: checkPermission<FetchPermission>(
      FetchPermissionMap.fetchFetchReadBody,
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
    sysInfoAllSysInfo: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoAllSysInfo,
      permissions
    )(sysInfoAllSysInfo),
    sysInfoTotalMemory: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoTotalMemory,
      permissions
    )(sysInfoTotalMemory),
    sysInfoUsedMemory: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoUsedMemory,
      permissions
    )(sysInfoUsedMemory),
    sysInfoTotalSwap: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoTotalSwap,
      permissions
    )(sysInfoTotalSwap),
    sysInfoUsedSwap: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoUsedSwap,
      permissions
    )(sysInfoUsedSwap),
    sysInfoMemoryInfo: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoMemoryInfo,
      permissions
    )(sysInfoMemoryInfo),
    sysInfoHostname: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoHostname,
      permissions
    )(sysInfoHostname),
    sysInfoName: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.sysInfoName, permissions)(sysInfoName),
    sysInfoKernelVersion: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoKernelVersion,
      permissions
    )(sysInfoKernelVersion),
    sysInfoOsVersion: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoOsVersion,
      permissions
    )(sysInfoOsVersion),
    sysInfoStaticInfo: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoStaticInfo,
      permissions
    )(sysInfoStaticInfo),
    sysInfoComponents: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoComponents,
      permissions
    )(sysInfoComponents),
    sysInfoCpus: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.sysInfoCpus, permissions)(sysInfoCpus),
    sysInfoCpuCount: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoCpuCount,
      permissions
    )(sysInfoCpuCount),
    sysInfoCpuInfo: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoCpuInfo,
      permissions
    )(sysInfoCpuInfo),
    sysInfoDisks: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoDisks,
      permissions
    )(sysInfoDisks),
    sysInfoNetworks: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoNetworks,
      permissions
    )(sysInfoNetworks),
    sysInfoProcesses: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoProcesses,
      permissions
    )(sysInfoProcesses),
    sysInfoRefreshAll: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoRefreshAll,
      permissions
    )(sysInfoRefreshAll),
    sysInfoRefreshMemory: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoRefreshMemory,
      permissions
    )(sysInfoRefreshMemory),
    sysInfoRefreshCpu: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoRefreshCpu,
      permissions
    )(sysInfoRefreshCpu),
    sysInfoRefreshProcesses: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoRefreshProcesses,
      permissions
    )(sysInfoRefreshProcesses),
    sysInfoBatteries: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.sysInfoBatteries,
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
  ...defaultEventApi,
  ...defaultPathApi,
  ...defaultLoggerApi,
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
    constructUpdownloadApi(permissions.filter((p) => p.startsWith('updownload:')) as UpdownloadPermission[]),
    constructEventApi(),
    constructLoggerApi(),
    constructPathApi()
  ]
  return Object.assign({}, ...apis)
}
