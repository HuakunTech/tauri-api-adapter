import { INotification } from '@/api/client-types'
import { defaultClientAPI, isMain } from '@/client'
import * as Comlink from '@huakunshen/comlink'
import { Remote } from '@huakunshen/comlink'
import { PluginListener } from '@tauri-apps/api/core'
import * as notificationApi from '@tauri-apps/plugin-notification'
import { INotificationServer } from './server-types'

export function constructAPI(api: Remote<INotificationServer>): INotification {
  return {
    sendNotification: api.notificationSendNotification,
    requestPermission: api.notificationRequestPermission,
    isPermissionGranted: api.notificationIsPermissionGranted,
    registerActionTypes: api.notificationRegisterActionTypes,
    // this may not work
    pending: api.notificationPending,
    cancel: api.notificationCancel,
    cancelAll: api.notificationCancelAll,
    // this may not work
    active: api.notificationActive,
    removeActive: api.notificationRemoveActive,
    removeAllActive: api.notificationRemoveAllActive,
    createChannel: api.notificationCreateChannel,
    removeChannel: api.notificationRemoveChannel,
    channels: api.notificationChannels,
    // this may not work
    onNotificationReceived: (
      cb: (notification: notificationApi.Options) => void
    ): Promise<PluginListener> => {
      return api.notificationOnNotificationReceived(Comlink.proxy(cb))
    },
    // this may not work
    onAction: (cb: (notification: notificationApi.Options) => void): Promise<PluginListener> => {
      return api.notificationOnAction(Comlink.proxy(cb))
    }
  }
}
export const comlinkNotification: INotification = constructAPI(defaultClientAPI)

export const nativeNotification: INotification = {
  sendNotification: notificationApi.sendNotification,
  requestPermission: notificationApi.requestPermission,
  isPermissionGranted: notificationApi.isPermissionGranted,
  registerActionTypes: notificationApi.registerActionTypes,
  pending: notificationApi.pending,
  cancel: notificationApi.cancel,
  cancelAll: notificationApi.cancelAll,
  active: notificationApi.active,
  removeActive: notificationApi.removeActive,
  removeAllActive: notificationApi.removeAllActive,
  createChannel: notificationApi.createChannel,
  removeChannel: notificationApi.removeChannel,
  channels: notificationApi.channels,
  onNotificationReceived: notificationApi.onNotificationReceived,
  onAction: notificationApi.onAction
}

export const notification = isMain ? nativeNotification : comlinkNotification
