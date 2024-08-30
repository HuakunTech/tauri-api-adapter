import { getWindowApiClient, getWorkerApiClient } from '../../comlink'

export type Environment = 'main' | 'iframe' | 'worker'

export const hasWindow = () => typeof window !== 'undefined'
export const isInWorker = () => !hasWindow()
export const isInIframe = () => hasWindow() && window !== window.parent
export const isMain = () => !isInWorker() && !isInIframe() && window === window.parent

export function getEnvironment() {
  if (isInIframe()) {
    return 'iframe'
  }
  if (isInWorker()) {
    return 'worker'
  }
  return 'main'
}

export const getDefaultClientAPI = <T>() =>
  isInIframe() ? getWindowApiClient<T>(window.parent) : getWorkerApiClient<T>()
