import * as Comlink from '@huakunshen/comlink'

/**
 *
 * @param win for example: window.parent if you want to call functions from parent window within an iframe
 * @returns
 */
export function getWindowApiClient<API>(win: Window): Comlink.Remote<API> {
  return Comlink.wrap<API>(Comlink.windowEndpoint(win))
}

export const getApiClient = Comlink.wrap

export function getWorkerApiClient<API>(worker: Worker): Comlink.Remote<API> {
  return Comlink.wrap<API>(worker)
}

/**
 * @param win for example: iframe.contentWindow
 * @param api API Implementation
 * @returns
 */
export function exposeApiToWindow<API>(win: Window, api: API) {
  return Comlink.expose(api, Comlink.windowEndpoint(win))
}

export function exposeApiToWorker<API>(worker: Worker, api: API) {
  return Comlink.expose(api, worker)
}

export * as Comlink from '@huakunshen/comlink'
