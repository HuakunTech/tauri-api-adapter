import { getApiClient } from './common'
import type { IApi } from './types'

export const isInIframe = window !== window.parent
export const iframeSideApi = getApiClient<IApi>(window.parent)
export const clientApi = iframeSideApi
