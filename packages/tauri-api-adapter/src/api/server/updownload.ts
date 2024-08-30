import { download, upload } from '@tauri-apps/plugin-upload'
import { UpdownloadPermissionMap } from '../../permissions/permission-map'
import type { UpdownloadPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { IUpdownload } from '../client/types'

export function constructUpdownloadApi(permissions: UpdownloadPermission[]): IUpdownload {
  return {
    upload: checkPermission<UpdownloadPermission>(UpdownloadPermissionMap.upload, permissions)(upload),
    download: checkPermission<UpdownloadPermission>(UpdownloadPermissionMap.download, permissions)(download)
  }
}
