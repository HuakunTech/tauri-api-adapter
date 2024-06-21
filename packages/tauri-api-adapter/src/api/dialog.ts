import { IDialog } from '@/api/types'
import { clientApi } from '@/comlink'
import * as _dialogApi from '@tauri-apps/plugin-dialog'

export const dialog: IDialog = {
  ask: clientApi.dialogAsk,
  confirm: clientApi.dialogConfirm,
  message: clientApi.dialogMessage,
  open: clientApi.dialogOpen,
  save: clientApi.dialogSave
}
