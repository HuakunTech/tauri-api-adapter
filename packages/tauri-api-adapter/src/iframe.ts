import { comlinkClipboard as clipboard } from './api/clipboard'
import { comlinkDialog as dialog } from './api/dialog'
import { comlinkEvent as event } from './api/event'
import { fetch } from './api/fetch'
import { comlinkFs as fs } from './api/fs'
import { comlinkLog as log } from './api/log'
import { comlinkNetwork as network } from './api/network'
import { comlinkNotification as notification } from './api/notification'
import { comlinkOs as os } from './api/os'
import { comlinkPath as path } from './api/path'
import { comlinkShell as shell } from './api/shell'
import { comlinkSysInfo as sysInfo } from './api/system-info'
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
