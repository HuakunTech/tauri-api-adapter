import { type Remote } from '@huakunshen/comlink'
import { arch, eol, exeExtension, family, hostname, locale, platform, version } from '@tauri-apps/plugin-os'
import { getDefaultClientAPI, isMain } from '../client'
import { type IOs } from './client-types'
import { type IOsServer } from './server-types'

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
const defaultClientAPI = getDefaultClientAPI<IOsServer>()
export const comlinkOs: IOs = constructAPI(defaultClientAPI)

export const nativeOs: IOs = {
  platform: () => Promise.resolve(platform()),
  arch: () => Promise.resolve(arch()),
  exeExtension: () => Promise.resolve(exeExtension()),
  family: () => Promise.resolve(family()),
  hostname: hostname,
  eol: () => Promise.resolve(eol()),
  version: () => Promise.resolve(version()),
  locale: locale
}

export const os = isMain() ? nativeOs : comlinkOs
