import { proxy as comlinkProxy, type Remote } from '@huakunshen/comlink'
import { download, upload } from '@tauri-apps/plugin-upload'
import { getDefaultClientAPI, isMain } from '../client'
import { type IUpdownload } from './client-types'
import { type IUpdownloadServer } from './server-types'

interface ProgressPayload {
  progress: number
  total: number
}
type ProgressHandler = (progress: ProgressPayload) => void

export function constructAPI(api: Remote<IUpdownloadServer>): IUpdownload {
  return {
    upload: (url: string, filePath: string, progressHandler?: ProgressHandler, headers?: Map<string, string>) =>
      api.upload(url, filePath, progressHandler ? comlinkProxy(progressHandler) : undefined, headers),
    download: (
      url: string,
      filePath: string,
      progressHandler?: (progress: ProgressPayload) => void,
      headers?: Map<string, string>
    ) => api.download(url, filePath, progressHandler ? comlinkProxy(progressHandler) : undefined, headers)
  }
}
const defaultClientAPI = getDefaultClientAPI<IUpdownloadServer>()
export const comlinkUpdownload: IUpdownload = constructAPI(defaultClientAPI)
export const nativeUpdownload: IUpdownload = {
  upload,
  download
}

export const updownload = isMain() ? nativeUpdownload : comlinkUpdownload
