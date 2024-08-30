import type { IShellInternal } from '../client/types'

export interface IShellServer {
  execute: IShellInternal['execute']
  kill: IShellInternal['kill']
  stdinWrite: IShellInternal['stdinWrite']
  open: IShellInternal['open']
  rawSpawn: IShellInternal['rawSpawn']
  executeBashScript: IShellInternal['executeBashScript']
  executePowershellScript: IShellInternal['executePowershellScript']
  executeAppleScript: IShellInternal['executeAppleScript']
  executePythonScript: IShellInternal['executePythonScript']
  executeZshScript: IShellInternal['executeZshScript']
  executeNodeScript: IShellInternal['executeNodeScript']
  hasCommand: IShellInternal['hasCommand']
  likelyOnWindows: IShellInternal['likelyOnWindows']
}
