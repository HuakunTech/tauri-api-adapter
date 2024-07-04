export type ClipboardPermissions =
  | 'clipboard:read-all'
  | 'clipboard:write-all'
  | 'clipboard:read-text'
  | 'clipboard:write-text'
  | 'clipboard:read-image'
  | 'clipboard:write-image'
  | 'clipboard:read-files'
  | 'clipboard:write-files'

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
