import { FetchOptions, FetchSendResponse } from '@/api/fetch/types'
import { Channel, invoke } from '@tauri-apps/api/core'
import * as dialog from '@tauri-apps/plugin-dialog'
import * as fs from '@tauri-apps/plugin-fs'
import * as notification from '@tauri-apps/plugin-notification'
import * as os from '@tauri-apps/plugin-os'
import * as clipboard from 'tauri-plugin-clipboard-api'
import * as shellx from 'tauri-plugin-shellx-api'
import { IApi } from './types'

export const defaultServerAPI: IApi = {
  /* -------------------------------------------------------------------------- */
  /*                                  Clipboard                                 */
  /* -------------------------------------------------------------------------- */
  clipboardReadText: clipboard.readText,
  clipboardWriteText: clipboard.writeText,
  clipboardReadImageBase64: clipboard.readImageBase64,
  clipboardReadImageBinary: clipboard.readImageBinary,
  clipboardWriteImageBase64: clipboard.writeImageBase64,
  clipboardWriteImageBinary: clipboard.writeImageBinary,
  clipboardReadFiles: clipboard.readFiles,
  clipboardWriteFiles: clipboard.writeFiles,
  clipboardReadRtf: clipboard.readRtf,
  clipboardWriteRtf: clipboard.writeRtf,
  clipboardReadHtml: clipboard.readHtml,
  clipboardWriteHtml: clipboard.writeHtml,
  clipboardWriteHtmlAndText: clipboard.writeHtmlAndText,
  clipboardHasText: clipboard.hasText,
  clipboardHasRTF: clipboard.hasRTF,
  clipboardHasHTML: clipboard.hasHTML,
  clipboardHasImage: clipboard.hasImage,
  clipboardHasFiles: clipboard.hasFiles,
  clipboardStartMonitor: clipboard.startMonitor,
  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */
  dialogAsk: dialog.ask,
  dialogConfirm: dialog.confirm,
  dialogMessage: dialog.message,
  dialogOpen: dialog.open,
  dialogSave: dialog.save,
  /* -------------------------------------------------------------------------- */
  /*                                Notification                                */
  /* -------------------------------------------------------------------------- */
  notificationIsPermissionGranted: notification.isPermissionGranted,
  notificationRequestPermission: notification.requestPermission,
  notificationSendNotification: notification.sendNotification,
  notificationRegisterActionTypes: notification.registerActionTypes,
  notificationPending: notification.pending,
  notificationCancel: notification.cancel,
  notificationCancelAll: notification.cancelAll,
  notificationActive: notification.active,
  notificationRemoveActive: notification.removeActive,
  notificationRemoveAllActive: notification.removeAllActive,
  notificationCreateChannel: notification.createChannel,
  notificationRemoveChannel: notification.removeChannel,
  notificationChannels: notification.channels,
  notificationOnNotificationReceived: notification.onNotificationReceived,
  notificationOnAction: notification.onAction,
  /* -------------------------------------------------------------------------- */
  /*                                 File System                                */
  /* -------------------------------------------------------------------------- */
  fsReadDir: fs.readDir,
  fsReadFile: fs.readFile,
  fsReadTextFile: fs.readTextFile,
  fsStat: fs.stat,
  fsLstat: fs.lstat,
  fsExists: fs.exists,
  fsMkdir: fs.mkdir,
  fsCreate: fs.create,
  fsCopyFile: fs.copyFile,
  fsRemove: fs.remove,
  fsRename: fs.rename,
  fsTruncate: fs.truncate,
  fsWriteFile: fs.writeFile,
  fsWriteTextFile: fs.writeTextFile,
  /* -------------------------------------------------------------------------- */
  /*                                     OS                                     */
  /* -------------------------------------------------------------------------- */
  osPlatform: os.platform,
  osArch: os.arch,
  osExeExtension: os.exeExtension,
  osFamily: os.family,
  osHostname: os.hostname,
  osEol: () => Promise.resolve(os.eol()),
  osVersion: os.version,
  osLocale: os.locale,
  /* -------------------------------------------------------------------------- */
  /*                                    Shell                                   */
  /* -------------------------------------------------------------------------- */
  shellExecute: (
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions
  ): Promise<shellx.ChildProcess<shellx.IOPayload>> =>
    invoke<shellx.ChildProcess<shellx.IOPayload>>('plugin:shellx|execute', {
      program: program,
      args: args,
      options: options
    }),
  shellKill: (pid: number) =>
    invoke<void>('plugin:shellx|kill', {
      cmd: 'killChild',
      pid: pid
    }),
  shellStdinWrite: (buffer: string | number[], pid: number) =>
    invoke('plugin:shellx|stdin_write', {
      buffer: buffer,
      pid: pid
    }),
  shellOpen: shellx.open,
  shellRawSpawn: <O extends shellx.IOPayload>(
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions,
    cb: (evt: shellx.CommandEvent<O>) => void
  ): Promise<number> => {
    const onEvent = new Channel<shellx.CommandEvent<O>>()
    onEvent.onmessage = cb
    return invoke<number>('plugin:shellx|spawn', {
      program: program,
      args: args,
      options: options,
      onEvent
    })
  },
  shellExecuteBashScript: shellx.executeBashScript,
  shellExecutePowershellScript: shellx.executePowershellScript,
  shellExecuteAppleScript: shellx.executeAppleScript,
  shellExecutePythonScript: shellx.executePythonScript,
  shellExecuteZshScript: shellx.executeZshScript,
  shellExecuteNodeScript: shellx.executeNodeScript,
  shellHasCommand: shellx.hasCommand,
  shellLikelyOnWindows: shellx.likelyOnWindows,
  /* -------------------------------------------------------------------------- */
  /*                                    Fetch                                   */
  /* -------------------------------------------------------------------------- */
  fetchRawFetch: (options: FetchOptions) => invoke<number>('plugin:http|fetch', options),
  fetchFetchCancel: (rid: number) => invoke<void>('plugin:http|fetch_cancel', { rid }),
  fetchFetchSend: (rid: number) => invoke<FetchSendResponse>('plugin:http|fetch_send', { rid }),
  fetchFetchReadBody: (rid: number) =>
    invoke<ArrayBuffer | number[]>('plugin:http|fetch_read_body', { rid })
}
