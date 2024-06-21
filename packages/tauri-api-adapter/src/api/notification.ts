import * as Comlink from '@huakunshen/comlink'
import { PluginListener } from '@tauri-apps/api/core'
import notificationApi from '@tauri-apps/plugin-notification'
import { INotification } from '@/api/types'
import { clientApi } from '@/comlink'

export const notification: INotification = {
  sendNotification: clientApi.notificationSendNotification,
  requestPermission: clientApi.notificationRequestPermission,
  isPermissionGranted: clientApi.notificationIsPermissionGranted,
  registerActionTypes: clientApi.notificationRegisterActionTypes,
  // this may not work
  pending: clientApi.notificationPending,
  cancel: clientApi.notificationCancel,
  cancelAll: clientApi.notificationCancelAll,
  // this may not work
  active: clientApi.notificationActive,
  removeActive: clientApi.notificationRemoveActive,
  removeAllActive: clientApi.notificationRemoveAllActive,
  createChannel: clientApi.notificationCreateChannel,
  removeChannel: clientApi.notificationRemoveChannel,
  channels: clientApi.notificationChannels,
  // this may not work
  onNotificationReceived: (
    cb: (notification: notificationApi.Options) => void
  ): Promise<PluginListener> => {
    return clientApi.notificationOnNotificationReceived(Comlink.proxy(cb))
  },
  // this may not work
  onAction: (cb: (notification: notificationApi.Options) => void): Promise<PluginListener> => {
    return clientApi.notificationOnAction(Comlink.proxy(cb))
  }
}
