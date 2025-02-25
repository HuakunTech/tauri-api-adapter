import type {
  IClipboard,
  IDialog,
  IFetchInternal,
  IFs,
  INotification,
  IOs,
  IShell,
  ISystemInfo,
  IUpdownload
} from '../api/client/types'
import type { IShellServer } from '../api/server/types'
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

export const ClipboardPermissionMap: Record<keyof IClipboard, ClipboardPermission[]> = {
  readText: ['clipboard:read-text', 'clipboard:read-all'],
  writeText: ['clipboard:write-text', 'clipboard:write-all'],
  readImageBase64: ['clipboard:read-all', 'clipboard:read-image'],
  readImageBinary: ['clipboard:read-all', 'clipboard:read-image'],
  writeImageBase64: ['clipboard:write-all', 'clipboard:write-image'],
  writeImageBinary: ['clipboard:write-all', 'clipboard:write-image'],
  readFiles: ['clipboard:read-all', 'clipboard:read-files'],
  writeFiles: ['clipboard:write-all', 'clipboard:write-files'],
  readRtf: ['clipboard:read-all', 'clipboard:read-text'],
  writeRtf: ['clipboard:write-all', 'clipboard:write-text'],
  readHtml: ['clipboard:read-all', 'clipboard:read-text'],
  writeHtml: ['clipboard:write-all', 'clipboard:write-text'],
  writeHtmlAndText: ['clipboard:write-all', 'clipboard:write-text'],
  hasText: [],
  hasRTF: [],
  hasHTML: [],
  hasImage: [],
  hasFiles: []
}

export const DialogPermissionMap: Record<keyof IDialog, DialogPermission[]> = {
  ask: ['dialog:all'],
  confirm: ['dialog:all'],
  message: ['dialog:all'],
  open: ['dialog:all'],
  save: ['dialog:all']
}

export const NotificationPermissionMap: Record<keyof INotification, NotificationPermission[]> = {
  sendNotification: ['notification:all'],
  requestPermission: ['notification:all'],
  isPermissionGranted: ['notification:all'],
  registerActionTypes: ['notification:all'],
  pending: ['notification:all'],
  cancel: ['notification:all'],
  cancelAll: ['notification:all'],
  active: ['notification:all'],
  removeActive: ['notification:all'],
  removeAllActive: ['notification:all'],
  createChannel: ['notification:all'],
  removeChannel: ['notification:all'],
  channels: ['notification:all'],
  onNotificationReceived: ['notification:all'],
  onAction: ['notification:all']
}

export const FsPermissionMap: Record<keyof IFs, FsPermission[]> = {
  readDir: ['fs:read'],
  readFile: ['fs:read'],
  readTextFile: ['fs:read'],
  stat: ['fs:read'],
  lstat: ['fs:read'],
  exists: ['fs:read', 'fs:exists'],
  mkdir: ['fs:write'],
  create: ['fs:write'],
  copyFile: ['fs:write'],
  remove: ['fs:write'],
  rename: ['fs:write'],
  truncate: ['fs:write'],
  writeFile: ['fs:write'],
  writeTextFile: ['fs:write']
}

export const OsPermissionMap: Record<keyof IOs, OsPermission[]> = {
  platform: [],
  arch: ['os:all'],
  exeExtension: ['os:all'],
  family: ['os:all'],
  hostname: ['os:all'],
  eol: ['os:all'],
  version: ['os:all'],
  locale: ['os:all']
}

export const FetchPermissionMap: Record<keyof IFetchInternal, FetchPermission[]> = {
  rawFetch: ['fetch:all'],
  fetchCancel: ['fetch:all'],
  fetchSend: ['fetch:all'],
  fetchReadBody: ['fetch:all']
}

export const SystemInfoPermissionMap: Record<keyof ISystemInfo, SystemInfoPermission[]> = {
  allSysInfo: ['system-info:all'],
  totalMemory: ['system-info:all', 'system-info:memory'],
  usedMemory: ['system-info:all', 'system-info:memory'],
  totalSwap: ['system-info:all', 'system-info:memory'],
  usedSwap: ['system-info:all', 'system-info:memory'],
  memoryInfo: ['system-info:all', 'system-info:memory'],
  hostname: ['system-info:all', 'system-info:network'],
  name: ['system-info:all', 'system-info:os'],
  kernelVersion: ['system-info:all', 'system-info:os'],
  osVersion: ['system-info:all', 'system-info:os'],
  staticInfo: ['system-info:all', 'system-info:os'],
  components: ['system-info:all', 'system-info:components'],
  cpus: ['system-info:all', 'system-info:cpu'],
  cpuCount: ['system-info:all', 'system-info:cpu'],
  cpuInfo: ['system-info:all', 'system-info:cpu'],
  disks: ['system-info:all', 'system-info:disk'],
  networks: ['system-info:all', 'system-info:network'],
  processes: ['system-info:all', 'system-info:process'],
  refreshAll: ['system-info:all'],
  refreshMemory: ['system-info:all', 'system-info:memory'],
  refreshCpu: ['system-info:all', 'system-info:cpu'],
  refreshProcesses: ['system-info:all', 'system-info:process'],
  batteries: ['system-info:all', 'system-info:battery']
}

export const ShellPermissionMap: Record<keyof IShellServer, ShellPermission[]> = {
  execute: ['shell:execute'],
  kill: ['shell:execute'],
  killPid: ['shell:kill-any'],
  stdinWrite: ['shell:execute'],
  open: ['shell:open'],
  rawSpawn: ['shell:execute'],
  executeBashScript: ['shell:execute'],
  executePowershellScript: ['shell:execute'],
  executeAppleScript: ['shell:execute'],
  executePythonScript: ['shell:execute'],
  executeZshScript: ['shell:execute'],
  executeNodeScript: ['shell:execute'],
  hasCommand: ['shell:execute'],
  likelyOnWindows: ['shell:execute']
}

export const UpdownloadPermissionMap: Record<keyof IUpdownload, UpdownloadPermission[]> = {
  upload: ['updownload:upload'],
  download: ['updownload:download']
}
