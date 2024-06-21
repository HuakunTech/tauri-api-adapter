import {
  IClipboard,
  IDialog,
  IFetch,
  IFs,
  INetwork,
  INotification,
  IOs,
  IShell,
  ISystemInfo
} from '@/api/types'

export interface IClipboardAPI {
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

export interface INotificationAPI {
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

export interface IDialogAPI {
  dialogAsk: IDialog['ask']
  dialogConfirm: IDialog['confirm']
  dialogMessage: IDialog['message']
  dialogOpen: IDialog['open']
  dialogSave: IDialog['save']
}

export interface IFSAPI {
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

export interface IOsAPI {
  osPlatform: IOs['platform']
  osArch: IOs['arch']
  osExeExtension: IOs['exeExtension']
  osFamily: IOs['family']
  osHostname: IOs['hostname']
  osEol: IOs['eol']
  osVersion: IOs['version']
  osLocale: IOs['locale']
}

export interface IShellAPI {
  shellExecute: IShell['execute']
  shellKill: IShell['kill']
  shellStdinWrite: IShell['stdinWrite']
  shellOpen: IShell['open']
  shellRawSpawn: IShell['rawSpawn']
  shellExecuteBashScript: IShell['executeBashScript']
  shellExecutePowershellScript: IShell['executePowershellScript']
  shellExecuteAppleScript: IShell['executeAppleScript']
  shellExecutePythonScript: IShell['executePythonScript']
  shellExecuteZshScript: IShell['executeZshScript']
  shellExecuteNodeScript: IShell['executeNodeScript']
  shellHasCommand: IShell['hasCommand']
  shellLikelyOnWindows: IShell['likelyOnWindows']
}

export interface IFetchAPI {
  fetchRawFetch: IFetch['rawFetch']
  fetchFetchCancel: IFetch['fetchCancel']
  fetchFetchSend: IFetch['fetchSend']
  fetchFetchReadBody: IFetch['fetchReadBody']
}

export interface ISystemInfoAPI {
  sysInfoAllSysInfo: ISystemInfo['allSysInfo']
  sysInfoTotalMemory: ISystemInfo['totalMemory']
  sysInfoUsedMemory: ISystemInfo['usedMemory']
  sysInfoTotalSwap: ISystemInfo['totalSwap']
  sysInfoUsedSwap: ISystemInfo['usedSwap']
  sysInfoMemoryInfo: ISystemInfo['memoryInfo']
  sysInfoHostname: ISystemInfo['hostname']
  sysInfoName: ISystemInfo['name']
  sysInfoKernelVersion: ISystemInfo['kernelVersion']
  sysInfoOsVersion: ISystemInfo['osVersion']
  sysInfoStaticInfo: ISystemInfo['staticInfo']
  sysInfoComponents: ISystemInfo['components']
  sysInfoCpus: ISystemInfo['cpus']
  sysInfoCpuCount: ISystemInfo['cpuCount']
  sysInfoCpuInfo: ISystemInfo['cpuInfo']
  sysInfoDisks: ISystemInfo['disks']
  sysInfoNetworks: ISystemInfo['networks']
  sysInfoProcesses: ISystemInfo['processes']
  sysInfoRefreshAll: ISystemInfo['refreshAll']
  sysInfoRefreshMemory: ISystemInfo['refreshMemory']
  sysInfoRefreshCpu: ISystemInfo['refreshCpu']
  sysInfoRefreshProcesses: ISystemInfo['refreshProcesses']
  sysInfoDebugCommand: ISystemInfo['debugCommand']
  sysInfoBatteries: ISystemInfo['batteries']
}

export interface INetworkAPI {
  networkGetInterfaces: INetwork['getInterfaces']
  networkGetNonEmptyInterfaces: INetwork['getNonEmptyInterfaces']
  networkFindAvailablePort: INetwork['findAvailablePort']
  networkIsPortTaken: INetwork['isPortTaken']
  networkIsHttpPortOpen: INetwork['isHttpPortOpen']
  networkScanOnlineIpPortPairs: INetwork['scanOnlineIpPortPairs']
  networkScanOnlineIpsByPort: INetwork['scanOnlineIpsByPort']
  networkNonLocalhostNetworks: INetwork['nonLocalhostNetworks']
  networkLocalServerIsRunning: INetwork['localServerIsRunning']
  networkScanLocalNetworkOnlineHostsByPort: INetwork['scanLocalNetworkOnlineHostsByPort']
}

export type IFullAPI = IClipboardAPI &
  INotificationAPI &
  IDialogAPI &
  IFSAPI &
  IShellAPI &
  IOsAPI &
  IFetchAPI &
  ISystemInfoAPI &
  INetworkAPI
