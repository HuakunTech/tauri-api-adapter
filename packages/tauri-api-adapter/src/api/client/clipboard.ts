import type { Remote } from 'comlink'
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
  // startMonitor,
  writeFiles,
  writeHtml,
  writeHtmlAndText,
  writeImageBase64,
  writeImageBinary,
  writeRtf,
  writeText
} from 'tauri-plugin-clipboard-api'
import type { IClipboard } from './types'

export function constructAPI(api: Remote<IClipboard>): IClipboard {
  return {
    readText: api.readText,
    writeText: api.writeText,
    readImageBase64: api.readImageBase64,
    readImageBinary: api.readImageBinary,
    writeImageBase64: api.writeImageBase64,
    writeImageBinary: api.writeImageBinary,
    readFiles: api.readFiles,
    writeFiles: api.writeFiles,
    readRtf: api.readRtf,
    writeRtf: api.writeRtf,
    readHtml: api.readHtml,
    writeHtml: api.writeHtml,
    writeHtmlAndText: api.writeHtmlAndText,
    hasText: api.hasText,
    hasRTF: api.hasRTF,
    hasHTML: api.hasHTML,
    hasImage: api.hasImage,
    hasFiles: api.hasFiles
    // startMonitor: api.startMonitor
  }
}

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
