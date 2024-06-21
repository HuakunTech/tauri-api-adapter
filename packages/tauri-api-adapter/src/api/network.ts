import { INetwork } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import * as _network from 'tauri-plugin-network-api'

export const comlinkNetwork: INetwork = {
  getInterfaces: defaultClientAPI.networkGetInterfaces,
  getNonEmptyInterfaces: defaultClientAPI.networkGetNonEmptyInterfaces,
  findAvailablePort: defaultClientAPI.networkFindAvailablePort,
  isPortTaken: defaultClientAPI.networkIsPortTaken,
  isHttpPortOpen: defaultClientAPI.networkIsHttpPortOpen,
  scanOnlineIpPortPairs: defaultClientAPI.networkScanOnlineIpPortPairs,
  scanOnlineIpsByPort: defaultClientAPI.networkScanOnlineIpsByPort,
  nonLocalhostNetworks: defaultClientAPI.networkNonLocalhostNetworks,
  localServerIsRunning: defaultClientAPI.networkLocalServerIsRunning,
  scanLocalNetworkOnlineHostsByPort: defaultClientAPI.networkScanLocalNetworkOnlineHostsByPort
}

export const nativeNetwork: INetwork = {
  getInterfaces: _network.getInterfaces,
  getNonEmptyInterfaces: _network.getNonEmptyInterfaces,
  findAvailablePort: _network.findAvailablePort,
  isPortTaken: _network.isPortTaken,
  isHttpPortOpen: _network.isHttpPortOpen,
  scanOnlineIpPortPairs: _network.scanOnlineIpPortPairs,
  scanOnlineIpsByPort: _network.scanOnlineIpsByPort,
  nonLocalhostNetworks: _network.nonLocalhostNetworks,
  localServerIsRunning: _network.localServerIsRunning,
  scanLocalNetworkOnlineHostsByPort: _network.scanLocalNetworkOnlineHostsByPort
}
