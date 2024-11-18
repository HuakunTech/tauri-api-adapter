import { IframeChildIO, RPCChannel, type DestroyableIoInterface } from 'kkrpc/browser'
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
  clipboard: IClipboard
  dialog: IDialog
  fetch: IFetchInternal
  event: IEventInternal
  fs: IFs
  log: ILogger
  notification: INotification
  os: IOs
  path: IPath
  shell: IShellInternal
  updownload: IUpdownload
  sysInfo: ISystemInfo
  network: INetwork
}
const io = new IframeChildIO()
const rpc = new RPCChannel<{}, API, DestroyableIoInterface>(io, {})
const _api = rpc.getAPI()

// const _api = wrap(windowEndpoint(globalThis.parent)) as unknown as API
export const fetch = constructFetchAPI(_api.fetch)
export const path = constructPathAPI(_api.path)
export const shell = constructShellAPI(_api.shell)
export const updownload = constructUpdownloadAPI(_api.updownload)
export const event = constructEventAPI(_api.event)
export const { os, clipboard, dialog, fs, log, notification, sysInfo, network } = _api
