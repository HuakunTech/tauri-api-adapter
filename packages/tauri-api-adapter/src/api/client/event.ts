import {
  type Event,
  type EventCallback,
  type EventName,
  type EventTarget,
  type Options,
  type UnlistenFn
} from '@tauri-apps/api/event'
import { proxy as comlinkProxy, type Remote } from '@huakunshen/comlink'
import type { IEvent, IEventInternal } from './types'

export function constructEventAPI(api: IEventInternal): IEvent {
  const _event = {
    rawListen: <T>(event: EventName, target: EventTarget, handler: (event: Event<T>) => void): Promise<number> =>
      api.rawListen(event, target, comlinkProxy(handler)),
    rawUnlisten: (event: string, eventId: number): Promise<void> => api.rawUnlisten(event, eventId),
    emit: (event: string, payload?: unknown): Promise<void> => api.emit(event, payload),
    emitTo: (target: EventTarget | string, event: string, payload?: unknown): Promise<void> =>
      api.emitTo(target, event, payload),
    once: <T>(event: EventName, handler: EventCallback<T>, options?: Options): Promise<UnlistenFn> =>
      api.once(event, handler, options)
  }

  const listen = async function listen<T>(
    eventName: EventName,
    handler: EventCallback<T>,
    options?: Options
  ): Promise<UnlistenFn> {
    const target: EventTarget =
      typeof options?.target === 'string'
        ? { kind: 'AnyLabel', label: options.target }
        : options?.target ?? { kind: 'Any' }
    return _event.rawListen(eventName, target, handler).then((eventId) => {
      return async () => {
        _event.rawUnlisten(eventName, eventId)
      }
    })
  }

  return {
    emit: _event.emit,
    emitTo: _event.emitTo,
    once: _event.once,
    listen
  }
}
