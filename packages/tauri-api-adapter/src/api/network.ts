import { INetwork } from '@/api/client-types'
import { defaultClientAPI, isMain } from '@/client'
import { Remote } from '@huakunshen/comlink'
import _network from 'tauri-plugin-network-api'
import { INetworkServer } from './server-types'

export function constructAPI(api: Remote<INetworkServer>): INetwork {
  return {
    getInterfaces: api.networkGetInterfaces,
    getNonEmptyInterfaces: api.networkGetNonEmptyInterfaces,
    findAvailablePort: api.networkFindAvailablePort,
    isPortTaken: api.networkIsPortTaken,
    isHttpPortOpen: api.networkIsHttpPortOpen,
    scanOnlineIpPortPairs: api.networkScanOnlineIpPortPairs,
    scanOnlineIpsByPort: api.networkScanOnlineIpsByPort,
    nonLocalhostNetworks: api.networkNonLocalhostNetworks,
    localServerIsRunning: api.networkLocalServerIsRunning,
    scanLocalNetworkOnlineHostsByPort: api.networkScanLocalNetworkOnlineHostsByPort
  }
}
export const comlinkNetwork: INetwork = constructAPI(defaultClientAPI)

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

export const network = isMain ? nativeNetwork : comlinkNetwork
