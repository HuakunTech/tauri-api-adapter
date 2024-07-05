import { type Remote } from '@huakunshen/comlink'
import {
  hasFiles,
  hasHTML,
  hasImage,
  hasRTF,
  hasText,
  readFiles,
  readHtml,
  readImageBase64,
  readImageBinary,
  readRtf,
  readText,
  startMonitor,
  writeFiles,
  writeHtml,
  writeHtmlAndText,
  writeImageBase64,
  writeImageBinary,
  writeRtf,
  writeText
} from 'tauri-plugin-clipboard-api'
import { getDefaultClientAPI, isMain } from '../client'
import { type IClipboard } from './client-types'
import { type IClipboardServer } from './server-types'

export function constructAPI(api: Remote<IClipboardServer>): IClipboard {
  return {
    readText: api.clipboardReadText,
    writeText: api.clipboardWriteText,
    readImageBase64: api.clipboardReadImageBase64,
    readImageBinary: api.clipboardReadImageBinary,
    writeImageBase64: api.clipboardWriteImageBase64,
    writeImageBinary: api.clipboardWriteImageBinary,
    readFiles: api.clipboardReadFiles,
    writeFiles: api.clipboardWriteFiles,
    readRtf: api.clipboardReadRtf,
    writeRtf: api.clipboardWriteRtf,
    readHtml: api.clipboardReadHtml,
    writeHtml: api.clipboardWriteHtml,
    writeHtmlAndText: api.clipboardWriteHtmlAndText,
    hasText: api.clipboardHasText,
    hasRTF: api.clipboardHasRTF,
    hasHTML: api.clipboardHasHTML,
    hasImage: api.clipboardHasImage,
    hasFiles: api.clipboardHasFiles
    // startMonitor: api.clipboardStartMonitor
  }
}
const defaultClientAPI = getDefaultClientAPI<IClipboardServer>()
export const comlinkClipboard = constructAPI(defaultClientAPI)

export const nativeClipboard: IClipboard = {
  readText,
  writeText,
  readImageBase64,
  readImageBinary,
  writeImageBase64,
  writeImageBinary,
  readFiles,
  writeFiles,
  readRtf,
  writeRtf,
  readHtml,
  writeHtml,
  writeHtmlAndText,
  hasText,
  hasRTF,
  hasHTML,
  hasImage,
  hasFiles
  // startMonitorr
}

export const clipboard = isMain() ? nativeClipboard : comlinkClipboard
