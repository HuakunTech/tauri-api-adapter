import { IClipboard } from '@/api/types'
import { clientApi } from '@/comlink'

export const clipboard: IClipboard = {
  readText: clientApi.clipboardReadText,
  writeText: clientApi.clipboardWriteText,
  readImageBase64: clientApi.clipboardReadImageBase64,
  readImageBinary: clientApi.clipboardReadImageBinary,
  writeImageBase64: clientApi.clipboardWriteImageBase64,
  writeImageBinary: clientApi.clipboardWriteImageBinary,
  readFiles: clientApi.clipboardReadFiles,
  writeFiles: clientApi.clipboardWriteFiles,
  readRtf: clientApi.clipboardReadRtf,
  writeRtf: clientApi.clipboardWriteRtf,
  readHtml: clientApi.clipboardReadHtml,
  writeHtml: clientApi.clipboardWriteHtml,
  writeHtmlAndText: clientApi.clipboardWriteHtmlAndText,
  hasText: clientApi.clipboardHasText,
  hasRTF: clientApi.clipboardHasRTF,
  hasHTML: clientApi.clipboardHasHTML,
  hasImage: clientApi.clipboardHasImage,
  hasFiles: clientApi.clipboardHasFiles,
  startMonitor: clientApi.clipboardStartMonitor
}
