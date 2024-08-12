import type {
  IClipboardServer,
  IDialogServer,
  IFetchServer,
  IFsServer,
  INetworkServer,
  INotificationServer,
  IOsServer,
  IShellServer,
  ISystemInfoServer,
  IUpdownloadServer
} from '../api/server-types'
import type {
  ClipboardPermission,
  DialogPermission,
  FetchPermission,
  FsPermission,
  NetworkPermission,
  NotificationPermission,
  OsPermission,
  ShellPermission,
  SystemInfoPermission,
  UpdownloadPermission
} from './schema'

/**
 * Map an API function name to its required permissions.
 * This type is only suitable for simple API permissions that maps one function to an array of permission strings.
 * No scoped permissions are supported.
 * Scoped permission is an object with more fine-grained permissions.
 */

export const ClipboardPermissionMap: Record<keyof IClipboardServer, ClipboardPermission[]> = {
  clipboardReadText: ['clipboard:read-text', 'clipboard:read-all'],
  clipboardWriteText: ['clipboard:write-text', 'clipboard:write-all'],
  clipboardReadImageBase64: ['clipboard:read-all', 'clipboard:read-image'],
  clipboardReadImageBinary: ['clipboard:read-all', 'clipboard:read-image'],
  clipboardWriteImageBase64: ['clipboard:write-all', 'clipboard:write-image'],
  clipboardWriteImageBinary: ['clipboard:write-all', 'clipboard:write-image'],
  clipboardReadFiles: ['clipboard:read-all', 'clipboard:read-files'],
  clipboardWriteFiles: ['clipboard:write-all', 'clipboard:write-files'],
  clipboardReadRtf: ['clipboard:read-all', 'clipboard:read-text'],
  clipboardWriteRtf: ['clipboard:write-all', 'clipboard:write-text'],
  clipboardReadHtml: ['clipboard:read-all', 'clipboard:read-text'],
  clipboardWriteHtml: ['clipboard:write-all', 'clipboard:write-text'],
  clipboardWriteHtmlAndText: ['clipboard:write-all', 'clipboard:write-text'],
  clipboardHasText: [],
  clipboardHasRTF: [],
  clipboardHasHTML: [],
  clipboardHasImage: [],
  clipboardHasFiles: []
}

export const DialogPermissionMap: Record<keyof IDialogServer, DialogPermission[]> = {
  dialogAsk: ['dialog:all'],
  dialogConfirm: ['dialog:all'],
  dialogMessage: ['dialog:all'],
  dialogOpen: ['dialog:all'],
  dialogSave: ['dialog:all']
}

export const NotificationPermissionMap: Record<keyof INotificationServer, NotificationPermission[]> = {
  notificationSendNotification: ['notification:all'],
  notificationRequestPermission: ['notification:all'],
  notificationIsPermissionGranted: ['notification:all'],
  notificationRegisterActionTypes: ['notification:all'],
  notificationPending: ['notification:all'],
  notificationCancel: ['notification:all'],
  notificationCancelAll: ['notification:all'],
  notificationActive: ['notification:all'],
  notificationRemoveActive: ['notification:all'],
  notificationRemoveAllActive: ['notification:all'],
  notificationCreateChannel: ['notification:all'],
  notificationRemoveChannel: ['notification:all'],
  notificationChannels: ['notification:all'],
  notificationOnNotificationReceived: ['notification:all'],
  notificationOnAction: ['notification:all']
}

export const FsPermissionMap: Record<keyof IFsServer, FsPermission[]> = {
  fsReadDir: ['fs:read'],
  fsReadFile: ['fs:read'],
  fsReadTextFile: ['fs:read'],
  fsStat: ['fs:read'],
  fsLstat: ['fs:read'],
  fsExists: ['fs:read', 'fs:exists'],
  fsMkdir: ['fs:write'],
  fsCreate: ['fs:write'],
  fsCopyFile: ['fs:write'],
  fsRemove: ['fs:write'],
  fsRename: ['fs:write'],
  fsTruncate: ['fs:write'],
  fsWriteFile: ['fs:write'],
  fsWriteTextFile: ['fs:write']
}

export const OsPermissionMap: Record<keyof IOsServer, OsPermission[]> = {
  osPlatform: [],
  osArch: ['os:all'],
  osExeExtension: ['os:all'],
  osFamily: ['os:all'],
  osHostname: ['os:all'],
  osEol: ['os:all'],
  osVersion: ['os:all'],
  osLocale: ['os:all']
}

export const FetchPermissionMap: Record<keyof IFetchServer, FetchPermission[]> = {
  fetchRawFetch: ['fetch:all'],
  fetchFetchCancel: ['fetch:all'],
  fetchFetchSend: ['fetch:all'],
  fetchFetchReadBody: ['fetch:all']
}

export const SystemInfoPermissionMap: Record<keyof ISystemInfoServer, SystemInfoPermission[]> = {
  sysInfoAllSysInfo: ['system-info:all'],
  sysInfoTotalMemory: ['system-info:all', 'system-info:memory'],
  sysInfoUsedMemory: ['system-info:all', 'system-info:memory'],
  sysInfoTotalSwap: ['system-info:all', 'system-info:memory'],
  sysInfoUsedSwap: ['system-info:all', 'system-info:memory'],
  sysInfoMemoryInfo: ['system-info:all', 'system-info:memory'],
  sysInfoHostname: ['system-info:all', 'system-info:network'],
  sysInfoName: ['system-info:all', 'system-info:os'],
  sysInfoKernelVersion: ['system-info:all', 'system-info:os'],
  sysInfoOsVersion: ['system-info:all', 'system-info:os'],
  sysInfoStaticInfo: ['system-info:all', 'system-info:os'],
  sysInfoComponents: ['system-info:all', 'system-info:components'],
  sysInfoCpus: ['system-info:all', 'system-info:cpu'],
  sysInfoCpuCount: ['system-info:all', 'system-info:cpu'],
  sysInfoCpuInfo: ['system-info:all', 'system-info:cpu'],
  sysInfoDisks: ['system-info:all', 'system-info:disk'],
  sysInfoNetworks: ['system-info:all', 'system-info:network'],
  sysInfoProcesses: ['system-info:all', 'system-info:process'],
  sysInfoRefreshAll: ['system-info:all'],
  sysInfoRefreshMemory: ['system-info:all', 'system-info:memory'],
  sysInfoRefreshCpu: ['system-info:all', 'system-info:cpu'],
  sysInfoRefreshProcesses: ['system-info:all', 'system-info:process'],
  sysInfoBatteries: ['system-info:all', 'system-info:battery']
}

export const ShellPermissionMap: Record<keyof IShellServer, ShellPermission[]> = {
  shellExecute: ['shell:execute'],
  shellKill: ['shell:execute'],
  shellStdinWrite: ['shell:execute'],
  shellOpen: ['shell:open'],
  shellRawSpawn: ['shell:execute'],
  shellExecuteBashScript: ['shell:execute'],
  shellExecutePowershellScript: ['shell:execute'],
  shellExecuteAppleScript: ['shell:execute'],
  shellExecutePythonScript: ['shell:execute'],
  shellExecuteZshScript: ['shell:execute'],
  shellExecuteNodeScript: ['shell:execute'],
  shellHasCommand: ['shell:execute'],
  shellLikelyOnWindows: ['shell:execute']
}

export const UpdownloadPermissionMap: Record<keyof IUpdownloadServer, UpdownloadPermission[]> = {
  upload: ['updownload:upload'],
  download: ['updownload:download']
}
