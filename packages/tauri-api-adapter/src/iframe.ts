import { windowEndpoint, wrap, type Remote } from 'comlink'
import { constructFetchAPI } from './api/client/fetch'
import type { IClipboard, IFetch, IFetchInternal } from './api/client/types'

type API = {
  clipboard: Remote<IClipboard>
  fetch: Remote<IFetchInternal>
}
const _api = wrap(windowEndpoint(globalThis.parent)) as unknown as API
// fetch API is special, we expose fetch function, while it's a wrapper of other IFetchInternal methods
export const fetch = constructFetchAPI(_api)
export const { clipboard } = _api
export const api = {
  ..._api,
  fetch
} as API & { fetch: IFetch }
