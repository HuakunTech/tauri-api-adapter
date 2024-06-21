import { ISystemInfo } from '@/api/client-types'
import { defaultClientAPI } from '@/client'
import * as _sysinfo from 'tauri-plugin-system-info-api'

export const comlinkSysInfo: ISystemInfo = {
  allSysInfo: defaultClientAPI.sysInfoAllSysInfo,
  totalMemory: defaultClientAPI.sysInfoTotalMemory,
  usedMemory: defaultClientAPI.sysInfoUsedMemory,
  totalSwap: defaultClientAPI.sysInfoTotalSwap,
  usedSwap: defaultClientAPI.sysInfoUsedSwap,
  memoryInfo: defaultClientAPI.sysInfoMemoryInfo,
  hostname: defaultClientAPI.sysInfoHostname,
  name: defaultClientAPI.sysInfoName,
  kernelVersion: defaultClientAPI.sysInfoKernelVersion,
  osVersion: defaultClientAPI.sysInfoOsVersion,
  staticInfo: defaultClientAPI.sysInfoStaticInfo,
  components: defaultClientAPI.sysInfoComponents,
  cpus: defaultClientAPI.sysInfoCpus,
  cpuCount: defaultClientAPI.sysInfoCpuCount,
  cpuInfo: defaultClientAPI.sysInfoCpuInfo,
  disks: defaultClientAPI.sysInfoDisks,
  networks: defaultClientAPI.sysInfoNetworks,
  processes: defaultClientAPI.sysInfoProcesses,
  refreshAll: defaultClientAPI.sysInfoRefreshAll,
  refreshMemory: defaultClientAPI.sysInfoRefreshMemory,
  refreshCpu: defaultClientAPI.sysInfoRefreshCpu,
  refreshProcesses: defaultClientAPI.sysInfoRefreshProcesses,
  debugCommand: defaultClientAPI.sysInfoDebugCommand,
  batteries: defaultClientAPI.sysInfoBatteries
}

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
