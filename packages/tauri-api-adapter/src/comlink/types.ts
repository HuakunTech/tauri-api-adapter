import { IClipboard, IDialog, IFetch, IFs, INotification, IOs, IShell } from '@/api/types'

export interface IClipboardApi {
  clipboardReadText: IClipboard['readText']
  clipboardWriteText: IClipboard['writeText']
  clipboardReadImageBase64: IClipboard['readImageBase64']
  clipboardReadImageBinary: IClipboard['readImageBinary']
  clipboardWriteImageBase64: IClipboard['writeImageBase64']
  clipboardWriteImageBinary: IClipboard['writeImageBinary']
  clipboardReadFiles: IClipboard['readFiles']
  clipboardWriteFiles: IClipboard['writeFiles']
  clipboardReadRtf: IClipboard['readRtf']
  clipboardWriteRtf: IClipboard['writeRtf']
  clipboardReadHtml: IClipboard['readHtml']
  clipboardWriteHtml: IClipboard['writeHtml']
  clipboardWriteHtmlAndText: IClipboard['writeHtmlAndText']
  clipboardHasText: IClipboard['hasText']
  clipboardHasRTF: IClipboard['hasRTF']
  clipboardHasHTML: IClipboard['hasHTML']
  clipboardHasImage: IClipboard['hasImage']
  clipboardHasFiles: IClipboard['hasFiles']
  clipboardStartMonitor: IClipboard['startMonitor']
}

export interface INotificationApi {
  notificationSendNotification: INotification['sendNotification']
  notificationRequestPermission: INotification['requestPermission']
  notificationIsPermissionGranted: INotification['isPermissionGranted']
  notificationRegisterActionTypes: INotification['registerActionTypes']
  notificationPending: INotification['pending']
  notificationCancel: INotification['cancel']
  notificationCancelAll: INotification['cancelAll']
  notificationActive: INotification['active']
  notificationRemoveActive: INotification['removeActive']
  notificationRemoveAllActive: INotification['removeAllActive']
  notificationCreateChannel: INotification['createChannel']
  notificationRemoveChannel: INotification['removeChannel']
  notificationChannels: INotification['channels']
  notificationOnNotificationReceived: INotification['onNotificationReceived']
  notificationOnAction: INotification['onAction']
}

export interface IDialogApi {
  dialogAsk: IDialog['ask']
  dialogConfirm: IDialog['confirm']
  dialogMessage: IDialog['message']
  dialogOpen: IDialog['open']
  dialogSave: IDialog['save']
}

export interface IFSApi {
  fsReadDir: IFs['readDir']
  fsReadFile: IFs['readFile']
  fsReadTextFile: IFs['readTextFile']
  fsStat: IFs['stat']
  fsLstat: IFs['lstat']
  fsExists: IFs['exists']
  fsMkdir: IFs['mkdir']
  fsCreate: IFs['create']
  fsCopyFile: IFs['copyFile']
  fsRemove: IFs['remove']
  fsRename: IFs['rename']
  fsTruncate: IFs['truncate']
  fsWriteFile: IFs['writeFile']
  fsWriteTextFile: IFs['writeTextFile']
}

export interface IOsApi {
  osPlatform: IOs['platform']
  osArch: IOs['arch']
  osExeExtension: IOs['exeExtension']
  osFamily: IOs['family']
  osHostname: IOs['hostname']
  osEol: IOs['eol']
  osVersion: IOs['version']
  osLocale: IOs['locale']
}

export interface IShellApi {
  shellExecute: IShell['execute']
  shellKill: IShell['kill']
  shellStdinWrite: IShell['stdinWrite']
  shellOpen: IShell['open']
  shellExecuteBashScript: IShell['executeBashScript']
  shellExecutePowershellScript: IShell['executePowershellScript']
  shellExecuteAppleScript: IShell['executeAppleScript']
  shellExecutePythonScript: IShell['executePythonScript']
  shellExecuteZshScript: IShell['executeZshScript']
  shellExecuteNodeScript: IShell['executeNodeScript']
  shellHasCommand: IShell['hasCommand']
  shellLikelyOnWindows: IShell['likelyOnWindows']
}

export interface IFetchApi {
  fetchRawFetch: IFetch['rawFetch']
  fetchFetchCancel: IFetch['fetchCancel']
  fetchFetchSend: IFetch['fetchSend']
  fetchFetchReadBody: IFetch['fetchReadBody']
}

export type IApi = IClipboardApi &
  INotificationApi &
  IDialogApi &
  IFSApi &
  IShellApi &
  IOsApi &
  IFetchApi
