import { ISystemInfo } from '@/api/types'
import { defaultClientAPI } from '@/comlink'

export const sysInfo: ISystemInfo = {
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
