import { getWindowApiClient } from './comlink'
import type { IFullAPI } from './api/server-types'

export const isInIframe = window !== window.parent
export const iframeSideApi = getWindowApiClient<IFullAPI>(window.parent)
/**
 * `defaultClientAPI` is auto selected depending on the environment.
 */
export const defaultClientAPI = iframeSideApi
