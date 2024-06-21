import { INetwork } from '@/api/client-types'
import { defaultClientAPI } from '@/comlink'

export const network: INetwork = {
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
