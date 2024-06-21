import { IOs } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import * as _os from '@tauri-apps/plugin-os'

export const comlinkOs: IOs = {
  platform: defaultClientAPI.osPlatform,
  arch: defaultClientAPI.osArch,
  exeExtension: defaultClientAPI.osExeExtension,
  family: defaultClientAPI.osFamily,
  hostname: defaultClientAPI.osHostname,
  eol: defaultClientAPI.osEol,
  version: defaultClientAPI.osVersion,
  locale: defaultClientAPI.osLocale
}

export const nativeOs: IOs = {
  platform: _os.platform,
  arch: _os.arch,
  exeExtension: _os.exeExtension,
  family: _os.family,
  hostname: _os.hostname,
  eol: () => Promise.resolve(_os.eol()),
  version: _os.version,
  locale: _os.locale
}
