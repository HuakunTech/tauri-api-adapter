import { IFs } from '@/api/types'
import { clientApi } from '@/comlink'

export const fs: IFs = {
  readDir: clientApi.fsReadDir,
  readFile: clientApi.fsReadFile,
  readTextFile: clientApi.fsReadTextFile,
  stat: clientApi.fsStat,
  lstat: clientApi.fsLstat,
  exists: clientApi.fsExists,
  mkdir: clientApi.fsMkdir,
  create: clientApi.fsCreate,
  copyFile: clientApi.fsCopyFile,
  remove: clientApi.fsRemove,
  rename: clientApi.fsRename,
  truncate: clientApi.fsTruncate,
  writeFile: clientApi.fsWriteFile,
  writeTextFile: clientApi.fsWriteTextFile
}
