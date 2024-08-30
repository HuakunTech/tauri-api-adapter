import {
  allSysInfo,
  batteries,
  components,
  cpuCount,
  cpuInfo,
  cpus,
  debugCommand,
  disks,
  hostname,
  kernelVersion,
  memoryInfo,
  name,
  networks,
  osVersion,
  processes,
  refreshAll,
  refreshCpu,
  refreshMemory,
  refreshProcesses,
  staticInfo,
  totalMemory,
  totalSwap,
  usedMemory,
  usedSwap
} from 'tauri-plugin-system-info-api'
import { SystemInfoPermissionMap } from '../../permissions/permission-map'
import type { SystemInfoPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { ISystemInfo } from '../client/types'

export function constructSystemInfoApi(permissions: SystemInfoPermission[]): ISystemInfo {
  return {
    allSysInfo: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.allSysInfo, permissions)(allSysInfo),
    totalMemory: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.totalMemory, permissions)(totalMemory),
    usedMemory: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.usedMemory, permissions)(usedMemory),
    totalSwap: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.totalSwap, permissions)(totalSwap),
    usedSwap: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.usedSwap, permissions)(usedSwap),
    memoryInfo: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.memoryInfo, permissions)(memoryInfo),
    hostname: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.hostname, permissions)(hostname),
    name: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.name, permissions)(name),
    kernelVersion: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.kernelVersion,
      permissions
    )(kernelVersion),
    osVersion: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.osVersion, permissions)(osVersion),
    staticInfo: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.staticInfo, permissions)(staticInfo),
    components: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.components, permissions)(components),
    cpus: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.cpus, permissions)(cpus),
    cpuCount: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.cpuCount, permissions)(cpuCount),
    cpuInfo: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.cpuInfo, permissions)(cpuInfo),
    disks: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.disks, permissions)(disks),
    networks: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.networks, permissions)(networks),
    processes: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.processes, permissions)(processes),
    refreshAll: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.refreshAll, permissions)(refreshAll),
    refreshMemory: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.refreshMemory,
      permissions
    )(refreshMemory),
    refreshCpu: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.refreshCpu, permissions)(refreshCpu),
    refreshProcesses: checkPermission<SystemInfoPermission>(
      SystemInfoPermissionMap.refreshProcesses,
      permissions
    )(refreshProcesses),
    batteries: checkPermission<SystemInfoPermission>(SystemInfoPermissionMap.batteries, permissions)(batteries)
  }
}
