import { IEvent } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import { Comlink } from '@/comlink'
import {
  Event,
  EventCallback,
  EventName,
  EventTarget,
  Options,
  UnlistenFn
} from '@tauri-apps/api/event'

export const event: IEvent = {
  rawListen: <T>(
    event: EventName,
    target: EventTarget,
    handler: (event: Event<T>) => void
  ): Promise<number> => defaultClientAPI.eventRawListen(event, target, Comlink.proxy(handler)),
  rawUnlisten: (event: string, eventId: number): Promise<void> =>
    defaultClientAPI.eventRawUnlisten(event, eventId),
  emit: (event: string, payload?: unknown): Promise<void> =>
    defaultClientAPI.eventEmit(event, payload),
  emitTo: (target: EventTarget | string, event: string, payload?: unknown): Promise<void> =>
    defaultClientAPI.eventEmitTo(target, event, payload),
  once: <T>(event: EventName, handler: EventCallback<T>, options?: Options): Promise<UnlistenFn> =>
    defaultClientAPI.eventOnce(event, handler, options)
}

export const listen = async function listen<T>(
  eventName: EventName,
  handler: EventCallback<T>,
  options?: Options
): Promise<UnlistenFn> {
  const target: EventTarget =
    typeof options?.target === 'string'
      ? { kind: 'AnyLabel', label: options.target }
      : options?.target ?? { kind: 'Any' }
  return event.rawListen(eventName, target, handler).then((eventId) => {
    return async () => {
      event.rawUnlisten(eventName, eventId)
    }
  })
}

export { TauriEvent } from '@tauri-apps/api/event'
