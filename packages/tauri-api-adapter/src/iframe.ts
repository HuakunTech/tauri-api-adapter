import { windowEndpoint, wrap, type Remote } from 'comlink'
import { getDefaultClientAPI } from './api/client'
import type { IClipboard } from './api/client/types'

export { constructAPI as constructClipboardAPI } from './api/client/clipboard'

type API = {
  clipboard: Remote<IClipboard>
}

// export const api = getDefaultClientAPI<API>()
export const api = wrap(windowEndpoint(globalThis.parent)) as unknown as API
export const { clipboard } = api
console.log('iframe api', api)
