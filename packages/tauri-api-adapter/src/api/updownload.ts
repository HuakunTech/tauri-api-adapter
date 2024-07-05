import { type Remote } from '@huakunshen/comlink'
import { download, upload } from '@tauri-apps/plugin-upload'
import { defaultClientAPI, isMain } from '../client'
import { type IUpdownload } from './client-types'
import { type IUpdownloadServer } from './server-types'

export function constructAPI(api: Remote<IUpdownloadServer>): IUpdownload {
  return {
    upload: api.upload,
    download: api.download
  }
}
export const comlinkUpdownload: IUpdownload = constructAPI(defaultClientAPI)
export const nativeUpdownload: IUpdownload = {
  upload,
  download
}

export const updownload = isMain ? nativeUpdownload : comlinkUpdownload
