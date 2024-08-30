import type {
  AllPermission,
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
} from '../../permissions/schema'
import { constructClipboardApi } from './clipboard'
import { constructDialogApi } from './dialog'
import { constructEventApi } from './event'
import { constructFetchApi } from './fetch'
import { constructFsApi } from './fs'
import { constructLoggerApi } from './log'
import { constructNetworkApi } from './network'
import { constructNotificationApi } from './notification'
import { constructOsApi } from './os'
import { constructPathApi } from './path'
import { constructShellApi } from './shell'
import { constructSystemInfoApi } from './system-info'
import { constructUpdownloadApi } from './updownload'

/**
 * This function constructs the server API that will be exposed to the client.
 *
 * If you want to expose cumtom APIs to client, copy this function and modify it.
 *
 * @example
 * ```ts
 * import { exposeApiToWindow, constructServerAPIWithPermissions } from 'tauri-api-adapter'
 * const permissions = ['fetch:all']
 * exposeApiToWindow(iframe.contentWindow, constructServerAPIWithPermissions(permissions))
 * ```
 * @param permissions
 * @returns
 */
export function constructServerAPIWithPermissions(permissions: AllPermission[]) {
  return {
    clipboard: constructClipboardApi(permissions.filter((p) => p.startsWith('clipboard:')) as ClipboardPermission[]),
    fetch: constructFetchApi(permissions.filter((p) => p.startsWith('fetch:')) as FetchPermission[]),
    dialog: constructDialogApi(permissions.filter((p) => p.startsWith('dialog:')) as DialogPermission[]),
    event: constructEventApi(),
    fs: constructFsApi(permissions.filter((p) => p.startsWith('fs:')) as FsPermission[]),
    log: constructLoggerApi(),
    notification: constructNotificationApi(
      permissions.filter((p) => p.startsWith('notification:')) as NotificationPermission[]
    ),
    os: constructOsApi(permissions.filter((p) => p.startsWith('os:')) as OsPermission[]),
    path: constructPathApi(),
    shell: constructShellApi(permissions.filter((p) => p.startsWith('shell:')) as ShellPermission[]),
    updownload: constructUpdownloadApi(
      permissions.filter((p) => p.startsWith('updownload:')) as UpdownloadPermission[]
    ),
    sysInfo: constructSystemInfoApi(permissions.filter((p) => p.startsWith('system-info:')) as SystemInfoPermission[]),
    network: constructNetworkApi(permissions.filter((p) => p.startsWith('network:')) as NetworkPermission[])
  }
}
