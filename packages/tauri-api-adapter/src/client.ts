import type { IFullAPI } from './api/server-types'
import { getWindowApiClient, getWorkerApiClient } from './comlink'

export const hasWindow = () => typeof window !== 'undefined'
export const isInWorker = () => !hasWindow()
export const isInIframe = () => hasWindow() && window !== window.parent
export const isMain = () => !isInWorker() && !isInIframe() && window === window.parent
export const getWorkerApi = () => getWorkerApiClient<IFullAPI>()
export const getIframeApi = () => getWindowApiClient<IFullAPI>(window.parent)
/**
 * `defaultClientAPI` is auto selected depending on the environment.
 */
export const defaultClientAPI = isInIframe() ? getIframeApi() : getWorkerApi()
