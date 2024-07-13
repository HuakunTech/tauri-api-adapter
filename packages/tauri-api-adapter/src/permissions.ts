import * as v from 'valibot'

export const ClipboardPermissionSchema = v.union([
  v.literal('clipboard:read-all'),
  v.literal('clipboard:write-all'),
  v.literal('clipboard:read-text'),
  v.literal('clipboard:write-text'),
  v.literal('clipboard:read-image'),
  v.literal('clipboard:write-image'),
  v.literal('clipboard:read-files'),
  v.literal('clipboard:write-files')
])
export type ClipboardPermission = v.InferOutput<typeof ClipboardPermissionSchema>

export const DialogPermissionSchema = v.literal('dialog:all')
export type DialogPermission = v.InferOutput<typeof DialogPermissionSchema>

export const NotificationPermissionSchema = v.literal('notification:all')
export type NotificationPermission = v.InferOutput<typeof NotificationPermissionSchema>

export const FsPermissionSchema = v.union([v.literal('fs:read'), v.literal('fs:write'), v.literal('fs:exists')])
export type FsPermission = v.InferOutput<typeof FsPermissionSchema>

export const OsPermissionSchema = v.literal('os:all')
export type OsPermission = v.InferOutput<typeof OsPermissionSchema>

export const ShellPermissionSchema = v.union([v.literal('shell:open'), v.literal('shell:execute')])
export type ShellPermission = v.InferOutput<typeof ShellPermissionSchema>

export const FetchPermissionSchema = v.literal('fetch:all')
export type FetchPermission = v.InferOutput<typeof FetchPermissionSchema>

export const SystemInfoPermissionSchema = v.union([
  v.literal('system-info:all'),
  v.literal('system-info:memory'),
  v.literal('system-info:cpu'),
  v.literal('system-info:os'),
  v.literal('system-info:disk'),
  v.literal('system-info:network'),
  v.literal('system-info:battery'),
  v.literal('system-info:process'),
  v.literal('system-info:components')
])
export type SystemInfoPermission = v.InferOutput<typeof SystemInfoPermissionSchema>

export const NetworkPermissionSchema = v.union([v.literal('network:interface'), v.literal('network:port')])
export type NetworkPermission = v.InferOutput<typeof NetworkPermissionSchema>

export const UpdownloadPermissionSchema = v.union([v.literal('updownload:download'), v.literal('updownload:upload')])
export type UpdownloadPermission = v.InferOutput<typeof UpdownloadPermissionSchema>

export const AllPermissionSchema = v.union([
  ClipboardPermissionSchema,
  DialogPermissionSchema,
  NotificationPermissionSchema,
  FsPermissionSchema,
  OsPermissionSchema,
  ShellPermissionSchema,
  FetchPermissionSchema,
  SystemInfoPermissionSchema,
  NetworkPermissionSchema,
  UpdownloadPermissionSchema
])
export type AllPermission = v.InferOutput<typeof AllPermissionSchema>

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
