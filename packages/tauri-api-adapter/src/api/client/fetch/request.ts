/**
 * This module is a modified versioin of Tauri's official `http` plugin.
 * https://github.com/tauri-apps/plugins-workspace/blob/e162e811fe5f6787eddd2cacac24ab0701539b45/plugins/http/guest-js/index.ts#L103
 */
// import { getDefaultClientAPI } from '../../client'
import type { Remote } from '@huakunshen/comlink'
import { type IFetch, type IFetchInternal } from '../types'
import { type ClientOptions } from './types'

// const defaultClientAPI = getDefaultClientAPI<IFetchServer>()
export function constructFetchAPI(api: Remote<IFetchInternal>): IFetch {
  /**
   * @example
   * ```ts
   * fetch('https://jsonplaceholder.typicode.com/todos')
   *   .then((res) => res.json())
   *   .then(console.log)
   * ```
   * @param input
   * @param init
   * @returns
   */
  return async function fetch(input: URL | Request | string, init?: RequestInit & ClientOptions): Promise<Response> {
    console.log('fetch', input, init)
    const maxRedirections = init?.maxRedirections
    const connectTimeout = init?.connectTimeout
    const proxy = init?.proxy

    // Remove these fields before creating the request
    if (init != null) {
      delete init.maxRedirections
      delete init.connectTimeout
      delete init.proxy
    }

    const signal = init?.signal

    const headers =
      init?.headers == null
        ? []
        : init.headers instanceof Headers
          ? Array.from(init.headers.entries())
          : Array.isArray(init.headers)
            ? init.headers
            : Object.entries(init.headers)

    const mappedHeaders: Array<[string, string]> = headers.map(([name, val]) => [
      name,
      // we need to ensure we have all values as strings
      // eslint-disable-next-line
      typeof val === 'string' ? val : (val as any).toString()
    ])

    const req = new Request(input, init)
    const buffer = await req.arrayBuffer()
    const reqData = buffer.byteLength !== 0 ? Array.from(new Uint8Array(buffer)) : null
    const rid = await api.rawFetch({
      clientConfig: {
        method: req.method,
        url: req.url,
        headers: mappedHeaders,
        data: reqData,
        maxRedirections,
        connectTimeout,
        proxy
      }
    })
    signal?.addEventListener('abort', () => {
      void api.fetchCancel(rid)
    })

    const { status, statusText, url, headers: responseHeaders, rid: responseRid } = await api.fetchSend(rid)

    const body = await api.fetchReadBody(responseRid)

    const res = new Response(
      body instanceof ArrayBuffer && body.byteLength !== 0
        ? body
        : body instanceof Array && body.length > 0
          ? new Uint8Array(body)
          : null,
      {
        headers: responseHeaders,
        status,
        statusText
      }
    )

    // url is read only but seems like we can do this
    Object.defineProperty(res, 'url', { value: url })

    return res
  }
}
