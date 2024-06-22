import { IFs } from '@/api/client-types'
import { defaultClientAPI, isMain } from '@/client'
import { Remote } from '@huakunshen/comlink'
import _fs from '@tauri-apps/plugin-fs'
import { IFsServer } from './server-types'

export function constructAPI(api: Remote<IFsServer>): IFs {
  return {
    readDir: api.fsReadDir,
    readFile: api.fsReadFile,
    readTextFile: api.fsReadTextFile,
    stat: api.fsStat,
    lstat: api.fsLstat,
    exists: api.fsExists,
    mkdir: api.fsMkdir,
    create: api.fsCreate,
    copyFile: api.fsCopyFile,
    remove: api.fsRemove,
    rename: api.fsRename,
    truncate: api.fsTruncate,
    writeFile: api.fsWriteFile,
    writeTextFile: api.fsWriteTextFile
  }
}
export const comlinkFs: IFs = constructAPI(defaultClientAPI)

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

export const fs = isMain ? nativeFs : comlinkFs
