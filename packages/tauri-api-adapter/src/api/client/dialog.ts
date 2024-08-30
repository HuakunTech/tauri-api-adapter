import { ask, confirm, message, open, save } from '@tauri-apps/plugin-dialog'
import type { IDialog } from './types'

export const nativeDialog: IDialog = {
  ask: ask,
  confirm: confirm,
  message: message,
  open: open,
  save: save
}
