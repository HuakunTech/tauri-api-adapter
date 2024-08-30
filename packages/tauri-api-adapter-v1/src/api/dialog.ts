import { type Remote } from '@huakunshen/comlink'
import { ask, confirm, message, open, save } from '@tauri-apps/plugin-dialog'
import { getDefaultClientAPI, isMain } from '../client'
import { type Context } from '../context'
import { type IDialog } from './client-types'
import { type IDialogServer } from './server-types'

export function constructAPI(api: Remote<IDialogServer>): IDialog {
  return {
    ask: api.dialogAsk,
    confirm: api.dialogConfirm,
    message: api.dialogMessage,
    open: api.dialogOpen,
    save: api.dialogSave
  }
}
// const defaultClientAPI = getDefaultClientAPI<IDialogServer>()
// export const comlinkDialog: IDialog = constructAPI(defaultClientAPI)
export const comlinkDialog = (context: Context) => constructAPI(context as Remote<IDialogServer>)
export const nativeDialog: IDialog = {
  ask: ask,
  confirm: confirm,
  message: message,
  open: open,
  save: save
}

export const dialog = isMain() ? nativeDialog : comlinkDialog
