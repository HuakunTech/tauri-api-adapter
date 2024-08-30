import { literal, union, type InferOutput } from 'valibot'

export const ClipboardPermissionSchema = union([
  literal('clipboard:read-all'),
  literal('clipboard:write-all'),
  literal('clipboard:read-text'),
  literal('clipboard:write-text'),
  literal('clipboard:read-image'),
  literal('clipboard:write-image'),
  literal('clipboard:read-files'),
  literal('clipboard:write-files')
])
export type ClipboardPermission = InferOutput<typeof ClipboardPermissionSchema>

export const DialogPermissionSchema = literal('dialog:all')
export type DialogPermission = InferOutput<typeof DialogPermissionSchema>

export const NotificationPermissionSchema = literal('notification:all')
export type NotificationPermission = InferOutput<typeof NotificationPermissionSchema>

export const FsPermissionSchema = union([literal('fs:read'), literal('fs:write'), literal('fs:exists')])
export type FsPermission = InferOutput<typeof FsPermissionSchema>

export const OsPermissionSchema = literal('os:all')
export type OsPermission = InferOutput<typeof OsPermissionSchema>

export const ShellPermissionSchema = union([literal('shell:open'), literal('shell:execute')])
export type ShellPermission = InferOutput<typeof ShellPermissionSchema>

export const FetchPermissionSchema = literal('fetch:all')
export type FetchPermission = InferOutput<typeof FetchPermissionSchema>

export const SystemInfoPermissionSchema = union([
  literal('system-info:all'),
  literal('system-info:memory'),
  literal('system-info:cpu'),
  literal('system-info:os'),
  literal('system-info:disk'),
  literal('system-info:network'),
  literal('system-info:battery'),
  literal('system-info:process'),
  literal('system-info:components')
])
export type SystemInfoPermission = InferOutput<typeof SystemInfoPermissionSchema>

export const NetworkPermissionSchema = union([literal('network:interface'), literal('network:port')])
export type NetworkPermission = InferOutput<typeof NetworkPermissionSchema>

export const UpdownloadPermissionSchema = union([literal('updownload:download'), literal('updownload:upload')])
export type UpdownloadPermission = InferOutput<typeof UpdownloadPermissionSchema>

export const AllPermissionSchema = union([
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
export type AllPermission = InferOutput<typeof AllPermissionSchema>
