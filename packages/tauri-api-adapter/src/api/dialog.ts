import { IDialog } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import { Remote } from '@huakunshen/comlink'
import * as _dialogApi from '@tauri-apps/plugin-dialog'
import { IDialogServer, IFullAPI } from './server-types'

export function constructAPI(api: Remote<IDialogServer>): IDialog {
  return {
    ask: api.dialogAsk,
    confirm: api.dialogConfirm,
    message: api.dialogMessage,
    open: api.dialogOpen,
    save: api.dialogSave
  }
}
export const comlinkDialog: IDialog = constructAPI(defaultClientAPI)
export const nativeDialog: IDialog = {
  ask: _dialogApi.ask,
  confirm: _dialogApi.confirm,
  message: _dialogApi.message,
  open: _dialogApi.open,
  save: _dialogApi.save
}
