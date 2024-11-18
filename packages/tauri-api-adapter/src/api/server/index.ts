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

export { constructClipboardApi } from './clipboard'
export { constructDialogApi } from './dialog'
export { constructEventApi } from './event'
export { constructFetchApi } from './fetch'
export { constructFsApi } from './fs'
export { constructLoggerApi } from './log'
export { constructNetworkApi } from './network'
export { constructNotificationApi } from './notification'
export { constructOsApi } from './os'
export { constructPathApi } from './path'
export { constructShellApi } from './shell'
export { constructSystemInfoApi } from './system-info'
export { constructUpdownloadApi } from './updownload'

/**
 * This function constructs the server API that will be exposed to the client.
 *
 * If you want to expose cumtom APIs to client, copy this function and modify it.
 *
 * @example
 * ```ts
 * import { IframeParentIO, RPCChannel } from 'kkrpc/browser'
 * import { constructServerAPIWithPermissions } from 'tauri-api-adapter'
 * const permissions = ['fetch:all']
 * const io = new IframeParentIO(iframe.contentWindow)
 * const rpc = new RPCChannel(io, { expose: constructServerAPIWithPermissions(permissions) })
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
