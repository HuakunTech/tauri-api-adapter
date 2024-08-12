export function checkPermission<P>(requiredPermissions: P[], userPermissions: P[]) {
  return <T extends (...args: any[]) => any>(fn: T): T => {
    return ((...args: any[]) => {
      if (
        requiredPermissions.length > 0 &&
        !requiredPermissions.some((permission) => userPermissions.includes(permission))
      ) {
        // throw new Error(`Permission denied. Required: ${requiredPermissions.join(', ')}`)
        throw new Error(
          `Permission denied for API "${fn.name}". Require one of these: [${requiredPermissions.join(', ')}]`
        )
      }
      return fn(...args)
    }) as T
  }
}
