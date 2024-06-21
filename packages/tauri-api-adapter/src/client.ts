import { getApiClient } from './comlink'
import type { IFullAPI } from './server-types'

export const isInIframe = window !== window.parent
export const iframeSideApi = getApiClient<IFullAPI>(window.parent)
/**
 * `defaultClientAPI` is auto selected depending on the environment.
 */
export const defaultClientAPI = iframeSideApi
