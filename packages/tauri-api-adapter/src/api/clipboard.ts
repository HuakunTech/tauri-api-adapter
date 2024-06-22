import { IClipboard } from '@/api/client-types'
import { defaultClientAPI, isMain } from '@/client'
import { Remote } from '@huakunshen/comlink'
import * as _clipboard from 'tauri-plugin-clipboard-api'
import { IClipboardServer } from './server-types'

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
    hasFiles: api.clipboardHasFiles,
    startMonitor: api.clipboardStartMonitor
  }
}
export const comlinkClipboard = constructAPI(defaultClientAPI)

export const nativeClipboard: IClipboard = {
  readText: _clipboard.readText,
  writeText: _clipboard.writeText,
  readImageBase64: _clipboard.readImageBase64,
  readImageBinary: _clipboard.readImageBinary,
  writeImageBase64: _clipboard.writeImageBase64,
  writeImageBinary: _clipboard.writeImageBinary,
  readFiles: _clipboard.readFiles,
  writeFiles: _clipboard.writeFiles,
  readRtf: _clipboard.readRtf,
  writeRtf: _clipboard.writeRtf,
  readHtml: _clipboard.readHtml,
  writeHtml: _clipboard.writeHtml,
  writeHtmlAndText: _clipboard.writeHtmlAndText,
  hasText: _clipboard.hasText,
  hasRTF: _clipboard.hasRTF,
  hasHTML: _clipboard.hasHTML,
  hasImage: _clipboard.hasImage,
  hasFiles: _clipboard.hasFiles,
  startMonitor: _clipboard.startMonitor
}

export const clipboard = isMain ? nativeClipboard : comlinkClipboard
