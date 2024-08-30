import { attachConsole, attachLogger, debug, error, info, trace, warn, type LogOptions } from '@tauri-apps/plugin-log'
import type { ILogger } from '../client/types'

export function constructLoggerApi(): ILogger {
  return {
    debug,
    error,
    info,
    trace,
    warn
  }
}
