import { windowEndpoint, wrap, type Remote } from 'comlink'
import { constructFetchAPI } from './api/client/fetch'
import { constructPathAPI } from './api/client/path'
import { constructShellAPI } from './api/client/shell'
import type {
  IClipboard,
  IDialog,
  IEvent,
  IFetch,
  IFetchInternal,
  IFs,
  ILogger,
  INetwork,
  INotification,
  IOs,
  IPath,
  IShell,
  IShellInternal,
  ISystemInfo,
  IUpdownload
} from './api/client/types'
import { constructUpdownloadAPI } from './api/client/updownload'

type API = {
  clipboard: Remote<IClipboard>
  dialog: Remote<IDialog>
  fetch: Remote<IFetchInternal>
  event: Remote<IEvent>
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
// fetch API is special, we expose fetch function, while it's a wrapper of other IFetchInternal methods
export const fetch = constructFetchAPI(_api.fetch)
export const path = constructPathAPI(_api.path)
export const shell = constructShellAPI(_api.shell)
export const updownload = constructUpdownloadAPI(_api.updownload)
export const { os, clipboard, dialog, event, fs, log, notification, sysInfo, network } = _api
// export const api = {
//   ..._api,
//   fetch
//   //   path
// } as API & { fetch: IFetch }
