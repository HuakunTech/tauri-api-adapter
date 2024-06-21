import { IOs } from '@/api/types'
import { clientApi } from '@/comlink'

export const os: IOs = {
  platform: clientApi.osPlatform,
  arch: clientApi.osArch,
  exeExtension: clientApi.osExeExtension,
  family: clientApi.osFamily,
  hostname: clientApi.osHostname,
  eol: clientApi.osEol,
  version: clientApi.osVersion,
  locale: clientApi.osLocale
}
