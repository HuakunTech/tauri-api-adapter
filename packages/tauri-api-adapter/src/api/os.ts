import { IOs } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import { Remote } from '@huakunshen/comlink'
import * as _os from '@tauri-apps/plugin-os'
import { IOsServer } from './server-types'

export function constructAPI(api: Remote<IOsServer>): IOs {
  return {
    platform: api.osPlatform,
    arch: api.osArch,
    exeExtension: api.osExeExtension,
    family: api.osFamily,
    hostname: api.osHostname,
    eol: api.osEol,
    version: api.osVersion,
    locale: api.osLocale
  }
}
export const comlinkOs: IOs = constructAPI(defaultClientAPI)

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
