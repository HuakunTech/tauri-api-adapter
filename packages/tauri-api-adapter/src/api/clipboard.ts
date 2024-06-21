import { IClipboard } from '@/api/client-types'
import { defaultClientAPI } from '@/client'

export const clipboard: IClipboard = {
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
