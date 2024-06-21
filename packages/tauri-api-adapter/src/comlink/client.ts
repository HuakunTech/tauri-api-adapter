import { getApiClient } from './common'
import type { IFullAPI } from './types'

export const isInIframe = window !== window.parent
export const iframeSideApi = getApiClient<IFullAPI>(window.parent)
export const defaultClientAPI = iframeSideApi
