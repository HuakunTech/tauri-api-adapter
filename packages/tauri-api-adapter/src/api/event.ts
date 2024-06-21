import { IEvent } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import { Comlink } from '@/comlink'
import * as _eventApi from '@tauri-apps/api/event'

const _event: IEvent = {
  rawListen: <T>(
    event: _eventApi.EventName,
    target: _eventApi.EventTarget,
    handler: (event: _eventApi.Event<T>) => void
  ): Promise<number> => defaultClientAPI.eventRawListen(event, target, Comlink.proxy(handler)),
  rawUnlisten: (event: string, eventId: number): Promise<void> =>
    defaultClientAPI.eventRawUnlisten(event, eventId),
  emit: (event: string, payload?: unknown): Promise<void> =>
    defaultClientAPI.eventEmit(event, payload),
  emitTo: (
    target: _eventApi.EventTarget | string,
    event: string,
    payload?: unknown
  ): Promise<void> => defaultClientAPI.eventEmitTo(target, event, payload),
  once: <T>(
    event: _eventApi.EventName,
    handler: _eventApi.EventCallback<T>,
    options?: _eventApi.Options
  ): Promise<_eventApi.UnlistenFn> => defaultClientAPI.eventOnce(event, handler, options)
}

export const listen = async function listen<T>(
  eventName: _eventApi.EventName,
  handler: _eventApi.EventCallback<T>,
  options?: _eventApi.Options
): Promise<_eventApi.UnlistenFn> {
  const target: _eventApi.EventTarget =
    typeof options?.target === 'string'
      ? { kind: 'AnyLabel', label: options.target }
      : options?.target ?? { kind: 'Any' }
  return _event.rawListen(eventName, target, handler).then((eventId) => {
    return async () => {
      _event.rawUnlisten(eventName, eventId)
    }
  })
}

export { TauriEvent } from '@tauri-apps/api/event'

export const comlinkEvent = {
  emit: _eventApi.emit,
  emitTo: _eventApi.emitTo,
  once: _eventApi.once,
  listen
}

export const nativeEvent = {
  ...comlinkEvent,
  listen: _eventApi.listen
}
