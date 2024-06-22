import { IEvent, IEventInternal } from '@/api/client-types'
import { defaultClientAPI, isMain } from '@/client'
import { Comlink } from '@/comlink'
import { Remote } from '@huakunshen/comlink'
import _eventApi from '@tauri-apps/api/event'
import { IEventServer } from './server-types'

export function constructAPI(api: Remote<IEventServer>): IEventInternal {
  return {
    rawListen: <T>(
      event: _eventApi.EventName,
      target: _eventApi.EventTarget,
      handler: (event: _eventApi.Event<T>) => void
    ): Promise<number> => api.eventRawListen(event, target, Comlink.proxy(handler)),
    rawUnlisten: (event: string, eventId: number): Promise<void> =>
      api.eventRawUnlisten(event, eventId),
    emit: (event: string, payload?: unknown): Promise<void> => api.eventEmit(event, payload),
    emitTo: (
      target: _eventApi.EventTarget | string,
      event: string,
      payload?: unknown
    ): Promise<void> => api.eventEmitTo(target, event, payload),
    once: <T>(
      event: _eventApi.EventName,
      handler: _eventApi.EventCallback<T>,
      options?: _eventApi.Options
    ): Promise<_eventApi.UnlistenFn> => api.eventOnce(event, handler, options)
  }
}

const _event = constructAPI(defaultClientAPI)

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

export const comlinkEvent: IEvent = {
  emit: _event.emit,
  emitTo: _event.emitTo,
  once: _event.once,
  listen
}

export const nativeEvent: IEvent = {
  emit: _eventApi.emit,
  emitTo: _eventApi.emitTo,
  once: _eventApi.once,
  listen: _eventApi.listen
}

export const event = isMain ? nativeEvent : comlinkEvent
