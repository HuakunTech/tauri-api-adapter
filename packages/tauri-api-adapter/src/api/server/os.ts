import { arch, eol, exeExtension, family, hostname, locale, platform, version } from '@tauri-apps/plugin-os'
import { OsPermissionMap } from '../../permissions/permission-map'
import type { OsPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { IOs } from '../client/types'

export function constructOsApi(permissions: OsPermission[]): IOs {
  return {
    // platform doesn't require any permission because the UI API relies on this to implement window dragging
    platform: checkPermission<OsPermission>(OsPermissionMap.platform, permissions)(() => Promise.resolve(platform())),
    arch: checkPermission<OsPermission>(OsPermissionMap.arch, permissions)(() => Promise.resolve(arch())),
    exeExtension: checkPermission<OsPermission>(
      OsPermissionMap.exeExtension,
      permissions
    )(() => Promise.resolve(exeExtension())),
    family: checkPermission<OsPermission>(OsPermissionMap.family, permissions)(() => Promise.resolve(family())),
    hostname: checkPermission<OsPermission>(OsPermissionMap.hostname, permissions)(hostname),
    eol: checkPermission<OsPermission>(OsPermissionMap.eol, permissions)(() => Promise.resolve(eol())),
    version: checkPermission<OsPermission>(OsPermissionMap.version, permissions)(() => Promise.resolve(version())),
    locale: checkPermission<OsPermission>(OsPermissionMap.locale, permissions)(locale)
  }
}
