import { invoke, transformCallback } from '@tauri-apps/api/core'
import { emit, emitTo, once, type EventCallback, type EventName, type EventTarget } from '@tauri-apps/api/event'
import type { IEventServer } from './types'

export function constructEventApi(): IEventServer {
  return {
    rawListen<T>(event: EventName, target: EventTarget, handler: EventCallback<T>): Promise<number> {
      return invoke<number>('plugin:event|listen', {
        event,
        target,
        handler: transformCallback(handler)
      })
    },
    rawUnlisten: (event: string, eventId: number): Promise<void> =>
      invoke<void>('plugin:event|unlisten', {
        event,
        eventId
      }),
    emit: emit,
    emitTo: emitTo,
    once: once
  }
}
