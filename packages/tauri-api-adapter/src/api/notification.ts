import { INotification } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import * as Comlink from '@huakunshen/comlink'
import { PluginListener } from '@tauri-apps/api/core'
import * as notificationApi from '@tauri-apps/plugin-notification'

export const comlinkNotification: INotification = {
  sendNotification: defaultClientAPI.notificationSendNotification,
  requestPermission: defaultClientAPI.notificationRequestPermission,
  isPermissionGranted: defaultClientAPI.notificationIsPermissionGranted,
  registerActionTypes: defaultClientAPI.notificationRegisterActionTypes,
  // this may not work
  pending: defaultClientAPI.notificationPending,
  cancel: defaultClientAPI.notificationCancel,
  cancelAll: defaultClientAPI.notificationCancelAll,
  // this may not work
  active: defaultClientAPI.notificationActive,
  removeActive: defaultClientAPI.notificationRemoveActive,
  removeAllActive: defaultClientAPI.notificationRemoveAllActive,
  createChannel: defaultClientAPI.notificationCreateChannel,
  removeChannel: defaultClientAPI.notificationRemoveChannel,
  channels: defaultClientAPI.notificationChannels,
  // this may not work
  onNotificationReceived: (
    cb: (notification: notificationApi.Options) => void
  ): Promise<PluginListener> => {
    return defaultClientAPI.notificationOnNotificationReceived(Comlink.proxy(cb))
  },
  // this may not work
  onAction: (cb: (notification: notificationApi.Options) => void): Promise<PluginListener> => {
    return defaultClientAPI.notificationOnAction(Comlink.proxy(cb))
  }
}

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
