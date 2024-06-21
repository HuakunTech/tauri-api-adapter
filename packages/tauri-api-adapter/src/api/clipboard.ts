import { IClipboard } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import * as _clipboard from 'tauri-plugin-clipboard-api'

export const comlinkClipboard: IClipboard = {
  readText: defaultClientAPI.clipboardReadText,
  writeText: defaultClientAPI.clipboardWriteText,
  readImageBase64: defaultClientAPI.clipboardReadImageBase64,
  readImageBinary: defaultClientAPI.clipboardReadImageBinary,
  writeImageBase64: defaultClientAPI.clipboardWriteImageBase64,
  writeImageBinary: defaultClientAPI.clipboardWriteImageBinary,
  readFiles: defaultClientAPI.clipboardReadFiles,
  writeFiles: defaultClientAPI.clipboardWriteFiles,
  readRtf: defaultClientAPI.clipboardReadRtf,
  writeRtf: defaultClientAPI.clipboardWriteRtf,
  readHtml: defaultClientAPI.clipboardReadHtml,
  writeHtml: defaultClientAPI.clipboardWriteHtml,
  writeHtmlAndText: defaultClientAPI.clipboardWriteHtmlAndText,
  hasText: defaultClientAPI.clipboardHasText,
  hasRTF: defaultClientAPI.clipboardHasRTF,
  hasHTML: defaultClientAPI.clipboardHasHTML,
  hasImage: defaultClientAPI.clipboardHasImage,
  hasFiles: defaultClientAPI.clipboardHasFiles,
  startMonitor: defaultClientAPI.clipboardStartMonitor
}

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
