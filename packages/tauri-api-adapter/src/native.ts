import { fetch } from '@tauri-apps/plugin-http'
import { nativeClipboard as clipboard } from './api/clipboard'
import { nativeDialog as dialog } from './api/dialog'
import { nativeEvent as event } from './api/event'
import { nativeFs as fs } from './api/fs'
import { log } from './api/log'
import { nativeNetwork as network } from './api/network'
import { nativeNotification as notification } from './api/notification'
import { nativeOs as os } from './api/os'
import { path } from './api/path'
import { nativeShell as shell } from './api/shell'
import { nativeSysInfo as sysInfo } from './api/system-info'
import { comlinkUpdownload as updownload } from './api/updownload'

export default {
  clipboard,
  dialog,
  event,
  fs,
  network,
  notification,
  os,
  shell,
  sysInfo,
  path,
  log,
  updownload,
  fetch
}
