import { ISystemInfo } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import { Remote } from '@huakunshen/comlink'
import * as _sysinfo from 'tauri-plugin-system-info-api'
import { ISystemInfoServer } from './server-types'

export function constructAPI(api: Remote<ISystemInfoServer>): ISystemInfo {
  return {
    allSysInfo: api.sysInfoAllSysInfo,
    totalMemory: api.sysInfoTotalMemory,
    usedMemory: api.sysInfoUsedMemory,
    totalSwap: api.sysInfoTotalSwap,
    usedSwap: api.sysInfoUsedSwap,
    memoryInfo: api.sysInfoMemoryInfo,
    hostname: api.sysInfoHostname,
    name: api.sysInfoName,
    kernelVersion: api.sysInfoKernelVersion,
    osVersion: api.sysInfoOsVersion,
    staticInfo: api.sysInfoStaticInfo,
    components: api.sysInfoComponents,
    cpus: api.sysInfoCpus,
    cpuCount: api.sysInfoCpuCount,
    cpuInfo: api.sysInfoCpuInfo,
    disks: api.sysInfoDisks,
    networks: api.sysInfoNetworks,
    processes: api.sysInfoProcesses,
    refreshAll: api.sysInfoRefreshAll,
    refreshMemory: api.sysInfoRefreshMemory,
    refreshCpu: api.sysInfoRefreshCpu,
    refreshProcesses: api.sysInfoRefreshProcesses,
    debugCommand: api.sysInfoDebugCommand,
    batteries: api.sysInfoBatteries
  }
}
export const comlinkSysInfo: ISystemInfo = constructAPI(defaultClientAPI)

export const nativeSysInfo: ISystemInfo = {
  allSysInfo: _sysinfo.allSysInfo,
  totalMemory: _sysinfo.totalMemory,
  usedMemory: _sysinfo.usedMemory,
  totalSwap: _sysinfo.totalSwap,
  usedSwap: _sysinfo.usedSwap,
  memoryInfo: _sysinfo.memoryInfo,
  hostname: _sysinfo.hostname,
  name: _sysinfo.name,
  kernelVersion: _sysinfo.kernelVersion,
  osVersion: _sysinfo.osVersion,
  staticInfo: _sysinfo.staticInfo,
  components: _sysinfo.components,
  cpus: _sysinfo.cpus,
  cpuCount: _sysinfo.cpuCount,
  cpuInfo: _sysinfo.cpuInfo,
  disks: _sysinfo.disks,
  networks: _sysinfo.networks,
  processes: _sysinfo.processes,
  refreshAll: _sysinfo.refreshAll,
  refreshMemory: _sysinfo.refreshMemory,
  refreshCpu: _sysinfo.refreshCpu,
  refreshProcesses: _sysinfo.refreshProcesses,
  debugCommand: _sysinfo.debugCommand,
  batteries: _sysinfo.batteries
}
