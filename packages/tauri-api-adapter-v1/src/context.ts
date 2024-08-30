import { windowEndpoint, wrap, type Endpoint, type Remote } from '@huakunshen/comlink'
import { getEnvironment } from './client'

export type Context = Remote<unknown>

export function getApiContext(): Context {
  const env = getEnvironment()
  switch (env) {
    case 'main':
      throw new Error('APIs are not available in the main thread')
    case 'iframe':
      return wrap(windowEndpoint(window.parent))
    case 'worker':
      return wrap(globalThis as Endpoint)
  }
}
