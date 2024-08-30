import {
  type EventCallback,
  type EventName,
  type Options as EventOptions,
  type EventTarget,
  type UnlistenFn
} from '@tauri-apps/api/event'
import type { IEventInternal, IShellInternal } from '../client/types'

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

export interface IEventServer {
  rawListen<T>(event: EventName, target: EventTarget, handler: EventCallback<any>): Promise<number>
  rawUnlisten: IEventInternal['rawUnlisten']
  emit: IEventInternal['emit']
  emitTo: IEventInternal['emitTo']
  once<T>(event: EventName, handler: EventCallback<any>, options?: EventOptions): Promise<UnlistenFn>
}
