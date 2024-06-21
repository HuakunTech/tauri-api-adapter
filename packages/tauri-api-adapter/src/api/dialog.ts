import { IDialog } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import * as _dialogApi from '@tauri-apps/plugin-dialog'

export const comlinkDialog: IDialog = {
  ask: defaultClientAPI.dialogAsk,
  confirm: defaultClientAPI.dialogConfirm,
  message: defaultClientAPI.dialogMessage,
  open: defaultClientAPI.dialogOpen,
  save: defaultClientAPI.dialogSave
}

export const nativeDialog: IDialog = {
  ask: _dialogApi.ask,
  confirm: _dialogApi.confirm,
  message: _dialogApi.message,
  open: _dialogApi.open,
  save: _dialogApi.save
}
