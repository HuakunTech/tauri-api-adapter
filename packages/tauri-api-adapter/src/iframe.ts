import { windowEndpoint, wrap, type Remote } from 'comlink'
import { constructEventAPI } from './api/client/event'
import { constructFetchAPI } from './api/client/fetch'
import { constructPathAPI } from './api/client/path'
import { constructShellAPI } from './api/client/shell'
import type {
  IClipboard,
  IDialog,
  IEventInternal,
  IFetchInternal,
  IFs,
  ILogger,
  INetwork,
  INotification,
  IOs,
  IPath,
  IShellInternal,
  ISystemInfo,
  IUpdownload
} from './api/client/types'
import { constructUpdownloadAPI } from './api/client/updownload'

type API = {
  clipboard: Remote<IClipboard>
  dialog: Remote<IDialog>
  fetch: Remote<IFetchInternal>
  event: IEventInternal
  fs: Remote<IFs>
  log: Remote<ILogger>
  notification: Remote<INotification>
  os: Remote<IOs>
  path: Remote<IPath>
  shell: IShellInternal
  updownload: IUpdownload
  sysInfo: Remote<ISystemInfo>
  network: Remote<INetwork>
}
const _api = wrap(windowEndpoint(globalThis.parent)) as unknown as API
export const fetch = constructFetchAPI(_api.fetch)
export const path = constructPathAPI(_api.path)
export const shell = constructShellAPI(_api.shell)
export const updownload = constructUpdownloadAPI(_api.updownload)
export const event = constructEventAPI(_api.event)
export const { os, clipboard, dialog, fs, log, notification, sysInfo, network } = _api
