import {
  active,
  cancel,
  cancelAll,
  channels,
  createChannel,
  isPermissionGranted,
  onAction,
  onNotificationReceived,
  pending,
  registerActionTypes,
  removeActive,
  removeAllActive,
  removeChannel,
  requestPermission,
  sendNotification
} from '@tauri-apps/plugin-notification'
import { NotificationPermissionMap } from '../../permissions/permission-map'
import { type NotificationPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { INotification } from '../client/types'

export function constructNotificationApi(permissions: NotificationPermission[]): INotification {
  return {
    isPermissionGranted: checkPermission<NotificationPermission>(
      NotificationPermissionMap.isPermissionGranted,
      permissions
    )(isPermissionGranted),
    requestPermission: checkPermission<NotificationPermission>(
      NotificationPermissionMap.requestPermission,
      permissions
    )(requestPermission),
    sendNotification: checkPermission<NotificationPermission>(
      NotificationPermissionMap.sendNotification,
      permissions
    )(sendNotification),
    registerActionTypes: checkPermission<NotificationPermission>(
      NotificationPermissionMap.registerActionTypes,
      permissions
    )(registerActionTypes),
    pending: checkPermission<NotificationPermission>(NotificationPermissionMap.pending, permissions)(pending),
    cancel: checkPermission<NotificationPermission>(NotificationPermissionMap.cancel, permissions)(cancel),
    cancelAll: checkPermission<NotificationPermission>(NotificationPermissionMap.cancelAll, permissions)(cancelAll),
    active: checkPermission<NotificationPermission>(NotificationPermissionMap.active, permissions)(active),
    removeActive: checkPermission<NotificationPermission>(
      NotificationPermissionMap.removeActive,
      permissions
    )(removeActive),
    removeAllActive: checkPermission<NotificationPermission>(
      NotificationPermissionMap.removeAllActive,
      permissions
    )(removeAllActive),
    createChannel: checkPermission<NotificationPermission>(
      NotificationPermissionMap.createChannel,
      permissions
    )(createChannel),
    removeChannel: checkPermission<NotificationPermission>(
      NotificationPermissionMap.removeChannel,
      permissions
    )(removeChannel),
    channels: checkPermission<NotificationPermission>(NotificationPermissionMap.channels, permissions)(channels),
    onNotificationReceived: checkPermission<NotificationPermission>(
      NotificationPermissionMap.onNotificationReceived,
      permissions
    )(onNotificationReceived),
    onAction: checkPermission<NotificationPermission>(NotificationPermissionMap.onAction, permissions)(onAction)
  }
}
