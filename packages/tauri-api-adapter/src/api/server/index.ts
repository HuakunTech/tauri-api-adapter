import type { AllPermission, ClipboardPermission } from '../../permissions/schema'
import type { IClipboard, IFetchInternal } from '../client/types'
import { constructClipboardApi } from './clipboard'
import { constructFetchApi } from './fetch'

export type IFullAPI = {
  clipboard: IClipboard
  fetch: IFetchInternal
}

export function constructServerAPIWithPermissions(permissions: AllPermission[]): IFullAPI {
  return {
    clipboard: constructClipboardApi(permissions.filter((p) => p.startsWith('clipboard:')) as ClipboardPermission[]),
    fetch: constructFetchApi(['fetch:all'])
  }
}
