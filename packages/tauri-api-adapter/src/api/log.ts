import { type Remote } from '@huakunshen/comlink'
import { attachConsole, attachLogger, debug, error, info, trace, warn } from '@tauri-apps/plugin-log'
import { defaultClientAPI, isMain } from '../client'
import { type ILogger } from './client-types'
import { type ILoggerServer } from './server-types'

export { type LogOptions } from '@tauri-apps/plugin-log'

export function constructAPI(api: Remote<ILoggerServer>): ILogger {
  return {
    debug: api.loggerDebug,
    error: api.loggerError,
    info: api.loggerInfo,
    trace: api.loggerTrace,
    warn: api.loggerWarn
  }
}
export const comlinkLog: ILogger = constructAPI(defaultClientAPI)

export const nativeLog: ILogger = {
  debug,
  error,
  info,
  trace,
  warn
}
export const log = isMain ? nativeLog : comlinkLog
