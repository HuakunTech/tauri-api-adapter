import { IFs } from '@/api/client-types'
import { defaultClientAPI } from '@/client'

export const fs: IFs = {
  readDir: defaultClientAPI.fsReadDir,
  readFile: defaultClientAPI.fsReadFile,
  readTextFile: defaultClientAPI.fsReadTextFile,
  stat: defaultClientAPI.fsStat,
  lstat: defaultClientAPI.fsLstat,
  exists: defaultClientAPI.fsExists,
  mkdir: defaultClientAPI.fsMkdir,
  create: defaultClientAPI.fsCreate,
  copyFile: defaultClientAPI.fsCopyFile,
  remove: defaultClientAPI.fsRemove,
  rename: defaultClientAPI.fsRename,
  truncate: defaultClientAPI.fsTruncate,
  writeFile: defaultClientAPI.fsWriteFile,
  writeTextFile: defaultClientAPI.fsWriteTextFile
}
