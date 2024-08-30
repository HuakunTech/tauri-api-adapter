import {
  copyFile,
  create,
  exists,
  lstat,
  mkdir,
  readDir,
  readFile,
  readTextFile,
  remove,
  rename,
  stat,
  truncate,
  writeFile,
  writeTextFile
} from '@tauri-apps/plugin-fs'
import { FsPermissionMap } from '../../permissions/permission-map'
import type { FsPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { IFs } from '../client/types'

export function constructFsApi(permissions: FsPermission[]): IFs {
  return {
    readDir: checkPermission<FsPermission>(FsPermissionMap.readDir, permissions)(readDir),
    readFile: checkPermission<FsPermission>(FsPermissionMap.readFile, permissions)(readFile),
    readTextFile: checkPermission<FsPermission>(FsPermissionMap.readTextFile, permissions)(readTextFile),
    stat: checkPermission<FsPermission>(FsPermissionMap.stat, permissions)(stat),
    lstat: checkPermission<FsPermission>(FsPermissionMap.lstat, permissions)(lstat),
    exists: checkPermission<FsPermission>(FsPermissionMap.exists, permissions)(exists),
    mkdir: checkPermission<FsPermission>(FsPermissionMap.mkdir, permissions)(mkdir),
    create: checkPermission<FsPermission>(FsPermissionMap.create, permissions)(create),
    copyFile: checkPermission<FsPermission>(FsPermissionMap.copyFile, permissions)(copyFile),
    remove: checkPermission<FsPermission>(FsPermissionMap.remove, permissions)(remove),
    rename: checkPermission<FsPermission>(FsPermissionMap.rename, permissions)(rename),
    truncate: checkPermission<FsPermission>(FsPermissionMap.truncate, permissions)(truncate),
    writeFile: checkPermission<FsPermission>(FsPermissionMap.writeFile, permissions)(writeFile),
    writeTextFile: checkPermission<FsPermission>(FsPermissionMap.writeTextFile, permissions)(writeTextFile)
  }
}
