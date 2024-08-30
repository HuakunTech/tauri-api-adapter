import type { AllPermission, ClipboardPermission } from '../../permissions/schema'
import type { IClipboard } from '../client/types'
import { constructClipboardApi } from './clipboard'

export type IFullAPI = {
  clipboard: IClipboard
}

export function constructServerAPIWithPermissions(permissions: AllPermission[]): IFullAPI {
  return {
    clipboard: constructClipboardApi(permissions.filter((p) => p.startsWith('clipboard:')) as ClipboardPermission[])
  }
}
