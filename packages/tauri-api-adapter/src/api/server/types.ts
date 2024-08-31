import {
  type EventCallback,
  type EventName,
  type Options as EventOptions,
  type EventTarget,
  type UnlistenFn
} from '@tauri-apps/api/event'
import type { IEventInternal, IShell, IShellInternal } from '../client/types'

export type IShellServer = IShellInternal &
  Pick<
    IShell,
    | 'executeBashScript'
    | 'executePowershellScript'
    | 'executeAppleScript'
    | 'executePythonScript'
    | 'executeZshScript'
    | 'executeNodeScript'
    | 'hasCommand'
    | 'likelyOnWindows'
  >

export interface IEventServer {
  rawListen<T>(event: EventName, target: EventTarget, handler: EventCallback<any>): Promise<number>
  rawUnlisten: IEventInternal['rawUnlisten']
  emit: IEventInternal['emit']
  emitTo: IEventInternal['emitTo']
  once<T>(event: EventName, handler: EventCallback<any>, options?: EventOptions): Promise<UnlistenFn>
}
