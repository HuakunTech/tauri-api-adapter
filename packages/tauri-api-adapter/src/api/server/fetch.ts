import { invoke } from '@tauri-apps/api/core'
import { FetchPermissionMap } from '../../permissions/permission-map'
import type { FetchPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { FetchOptions, FetchSendResponse } from '../client/fetch/types'
import type { IFetchInternal } from '../client/types'

export function constructFetchApi(permissions: FetchPermission[]): IFetchInternal {
  return {
    rawFetch: checkPermission<FetchPermission>(
      FetchPermissionMap.rawFetch,
      permissions
    )((options: FetchOptions) => invoke<number>('plugin:http|fetch', options)),
    fetchCancel: checkPermission<FetchPermission>(
      FetchPermissionMap.fetchCancel,
      permissions
    )((rid: number) => invoke<void>('plugin:http|fetch_cancel', { rid })),
    fetchSend: checkPermission<FetchPermission>(
      FetchPermissionMap.fetchSend,
      permissions
    )((rid: number) => invoke<FetchSendResponse>('plugin:http|fetch_send', { rid })),
    fetchReadBody: checkPermission<FetchPermission>(
      FetchPermissionMap.fetchReadBody,
      permissions
    )((rid: number) => invoke<ArrayBuffer | number[]>('plugin:http|fetch_read_body', { rid }))
  }
}
export const defaultFetchApi = constructFetchApi(['fetch:all'])
