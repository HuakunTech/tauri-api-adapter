import { IFs } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import * as _fs from '@tauri-apps/plugin-fs'

export const comlinkFs: IFs = {
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

export const nativeFs: IFs = {
  readDir: _fs.readDir,
  readFile: _fs.readFile,
  readTextFile: _fs.readTextFile,
  stat: _fs.stat,
  lstat: _fs.lstat,
  exists: _fs.exists,
  mkdir: _fs.mkdir,
  create: _fs.create,
  copyFile: _fs.copyFile,
  remove: _fs.remove,
  rename: _fs.rename,
  truncate: _fs.truncate,
  writeFile: _fs.writeFile,
  writeTextFile: _fs.writeTextFile
}
