import { IDialog } from '@/api/client-types'
import { defaultClientAPI } from '@/comlink'
import * as _dialogApi from '@tauri-apps/plugin-dialog'

export const dialog: IDialog = {
  ask: defaultClientAPI.dialogAsk,
  confirm: defaultClientAPI.dialogConfirm,
  message: defaultClientAPI.dialogMessage,
  open: defaultClientAPI.dialogOpen,
  save: defaultClientAPI.dialogSave
}
