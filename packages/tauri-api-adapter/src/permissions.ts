export type ClipboardPermission =
  | 'clipboard:read-all'
  | 'clipboard:write-all'
  | 'clipboard:read-text'
  | 'clipboard:write-text'
  | 'clipboard:read-image'
  | 'clipboard:write-image'
  | 'clipboard:read-files'
  | 'clipboard:write-files'

export type DialogPermission = 'dialog:all'
export type NotificationPermission = 'notification:all'
export type FsPermission = 'fs:read' | 'fs:write' | 'fs:exists'
export type OsPermission = 'os:all'
export type ShellPermission = 'shell:open' | 'shell:execute'
export type FetchPermission = 'fetch:all'
export type SystemInfoPermission =
  | 'system-info:all'
  | 'system-info:memory'
  | 'system-info:cpu'
  | 'system-info:os'
  | 'system-info:disk'
  | 'system-info:network'
  | 'system-info:battery'
  | 'system-info:process'
  | 'system-info:components'
export type NetworkPermission = 'network:interface' | 'network:port'

export function checkPermission<P>(requiredPermissions: P[], userPermissions: P[]) {
  return <T extends (...args: any[]) => any>(fn: T): T => {
    return ((...args: any[]) => {
      if (!requiredPermissions.some((permission) => userPermissions.includes(permission))) {
        // throw new Error(`Permission denied. Required: ${requiredPermissions.join(', ')}`)
        throw new Error(`Permission denied for API "${fn.name}". Required: ${requiredPermissions.join(', ')}`)
      }
      return fn(...args)
    }) as T
  }
}
