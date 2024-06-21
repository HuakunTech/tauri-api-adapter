import * as Comlink from '@huakunshen/comlink'

export function getApiClient<API>(win: Window): Comlink.Remote<API> {
  return Comlink.wrap<API>(Comlink.windowEndpoint(win))
}

/**
 * @param win for example: iframe.contentWindow
 * @param api API Implementation
 * @returns
 */
export function exposeApiToWindow<API>(win: Window, api: API) {
  return Comlink.expose(api, Comlink.windowEndpoint(win))
}
