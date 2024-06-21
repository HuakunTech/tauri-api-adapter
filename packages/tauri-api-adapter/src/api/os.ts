import { IOs } from '@/api/types'
import { defaultClientAPI } from '@/comlink'

export const os: IOs = {
  platform: defaultClientAPI.osPlatform,
  arch: defaultClientAPI.osArch,
  exeExtension: defaultClientAPI.osExeExtension,
  family: defaultClientAPI.osFamily,
  hostname: defaultClientAPI.osHostname,
  eol: defaultClientAPI.osEol,
  version: defaultClientAPI.osVersion,
  locale: defaultClientAPI.osLocale
}
