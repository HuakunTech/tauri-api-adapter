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
