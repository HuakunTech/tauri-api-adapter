import { proxy as comlinkProxy, type Remote } from '@huakunshen/comlink'
import {
  emit,
  emitTo,
  once,
  type Event,
  type EventCallback,
  type EventName,
  type EventTarget,
  type Options,
  type UnlistenFn
} from '@tauri-apps/api/event'
import { getDefaultClientAPI, isMain } from '../client'
import { type IEvent, type IEventInternal } from './client-types'
import { type IEventServer } from './server-types'

export function constructAPI(api: Remote<IEventServer>): IEventInternal {
  return {
    rawListen: <T>(event: EventName, target: EventTarget, handler: (event: Event<T>) => void): Promise<number> =>
      api.eventRawListen(event, target, comlinkProxy(handler)),
    rawUnlisten: (event: string, eventId: number): Promise<void> => api.eventRawUnlisten(event, eventId),
    emit: (event: string, payload?: unknown): Promise<void> => api.eventEmit(event, payload),
    emitTo: (target: EventTarget | string, event: string, payload?: unknown): Promise<void> =>
      api.eventEmitTo(target, event, payload),
    once: <T>(event: EventName, handler: EventCallback<T>, options?: Options): Promise<UnlistenFn> =>
      api.eventOnce(event, handler, options)
  }
}

const defaultClientAPI = getDefaultClientAPI<IEventServer>()
const _event = constructAPI(defaultClientAPI)

export const listen = async function listen<T>(
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

export { TauriEvent } from '@tauri-apps/api/event'

export const comlinkEvent: IEvent = {
  emit: _event.emit,
  emitTo: _event.emitTo,
  once: _event.once,
  listen
}

export const nativeEvent: IEvent = {
  emit: emit,
  emitTo: emitTo,
  once: once,
  listen: listen
}

export const event = isMain() ? nativeEvent : comlinkEvent
