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
import { ClipboardPermissionMap } from '../../permissions/permission-map'
import type { ClipboardPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { IClipboard } from '../client/types'

/* -------------------------------------------------------------------------- */
/*                                  Clipboard                                 */
/* -------------------------------------------------------------------------- */
export function constructClipboardApi(permissions: ClipboardPermission[]): IClipboard {
  return {
    readText: checkPermission<ClipboardPermission>(ClipboardPermissionMap.readText, permissions)(readText),
    writeText: checkPermission<ClipboardPermission>(ClipboardPermissionMap.writeText, permissions)(writeText),
    readImageBase64: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.readImageBase64,
      permissions
    )(readImageBase64),
    readImageBinary: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.readImageBinary,
      permissions
    )(readImageBinary),
    writeImageBase64: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.writeImageBase64,
      permissions
    )(writeImageBase64),
    writeImageBinary: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.writeImageBinary,
      permissions
    )(writeImageBinary),
    readFiles: checkPermission<ClipboardPermission>(ClipboardPermissionMap.readFiles, permissions)(readFiles),
    writeFiles: checkPermission<ClipboardPermission>(ClipboardPermissionMap.writeFiles, permissions)(writeFiles),
    readRtf: checkPermission<ClipboardPermission>(ClipboardPermissionMap.readRtf, permissions)(readRtf),
    writeRtf: checkPermission<ClipboardPermission>(ClipboardPermissionMap.writeRtf, permissions)(writeRtf),
    readHtml: checkPermission<ClipboardPermission>(ClipboardPermissionMap.readHtml, permissions)(readHtml),
    writeHtml: checkPermission<ClipboardPermission>(ClipboardPermissionMap.writeHtml, permissions)(writeHtml),
    writeHtmlAndText: checkPermission<ClipboardPermission>(
      ClipboardPermissionMap.writeHtmlAndText,
      permissions
    )(writeHtmlAndText),
    hasText: checkPermission<ClipboardPermission>(ClipboardPermissionMap.hasText, permissions)(hasText),
    hasRTF: checkPermission<ClipboardPermission>(ClipboardPermissionMap.hasRTF, permissions)(hasRTF),
    hasHTML: checkPermission<ClipboardPermission>(ClipboardPermissionMap.hasHTML, permissions)(hasHTML),
    hasImage: checkPermission<ClipboardPermission>(ClipboardPermissionMap.hasImage, permissions)(hasImage),
    hasFiles: checkPermission<ClipboardPermission>(ClipboardPermissionMap.hasFiles, permissions)(hasFiles)
    // startMonitor: checkPermission<ClipboardPermissions>([], permissions)(clipboard.startMonitor)
  }
}
