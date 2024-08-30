import {
  findAvailablePort,
  getInterfaces,
  getNonEmptyInterfaces,
  isHttpPortOpen,
  isPortTaken,
  localServerIsRunning,
  nonLocalhostNetworks,
  scanLocalNetworkOnlineHostsByPort,
  scanOnlineIpPortPairs,
  scanOnlineIpsByPort
} from 'tauri-plugin-network-api'
import type { NetworkPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { INetwork } from '../client/types'

export function constructNetworkApi(permissions: NetworkPermission[]): INetwork {
  return {
    getInterfaces: checkPermission<NetworkPermission>(['network:interface'], permissions)(getInterfaces),
    getNonEmptyInterfaces: checkPermission<NetworkPermission>(
      ['network:interface'],
      permissions
    )(getNonEmptyInterfaces),
    findAvailablePort: checkPermission<NetworkPermission>(['network:port'], permissions)(findAvailablePort),
    isPortTaken: checkPermission<NetworkPermission>(['network:port'], permissions)(isPortTaken),
    isHttpPortOpen: checkPermission<NetworkPermission>(['network:port'], permissions)(isHttpPortOpen)
    // networkScanOnlineIpPortPairs,
    // networkScanOnlineIpsByPort,
    // networkNonLocalhostNetworks,
    // networkLocalServerIsRunning,
    // networkScanLocalNetworkOnlineHostsByPort
  }
}
