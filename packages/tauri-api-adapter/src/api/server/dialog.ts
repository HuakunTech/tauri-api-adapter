import { ask, confirm, message, open, save } from '@tauri-apps/plugin-dialog'
import { DialogPermissionMap } from '../../permissions/permission-map'
import type { DialogPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { IDialog } from '../client/types'

export function constructDialogApi(permissions: DialogPermission[]): IDialog {
  return {
    ask: checkPermission<DialogPermission>(DialogPermissionMap.ask, permissions)(ask),
    confirm: checkPermission<DialogPermission>(DialogPermissionMap.confirm, permissions)(confirm),
    message: checkPermission<DialogPermission>(DialogPermissionMap.message, permissions)(message),
    open: checkPermission<DialogPermission>(DialogPermissionMap.open, permissions)(open),
    save: checkPermission<DialogPermission>(DialogPermissionMap.save, permissions)(save)
  }
}
