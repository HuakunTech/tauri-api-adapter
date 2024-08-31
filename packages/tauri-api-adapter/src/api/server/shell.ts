import { Channel, invoke } from '@tauri-apps/api/core'
import {
  executeAppleScript,
  executeBashScript,
  executeNodeScript,
  executePowershellScript,
  executePythonScript,
  executeZshScript,
  hasCommand,
  likelyOnWindows,
  open,
  type ChildProcess,
  type CommandEvent,
  type InternalSpawnOptions,
  type IOPayload
} from 'tauri-plugin-shellx-api'
import { ShellPermissionMap } from '../../permissions/permission-map'
import type { ShellPermission } from '../../permissions/schema'
import { checkPermission } from '../../permissions/util'
import type { IShellServer } from './types'

export function constructShellApi(permissions: ShellPermission[]): IShellServer {
  return {
    execute: checkPermission<ShellPermission>(
      ShellPermissionMap.execute,
      permissions
    )(
      (program: string, args: string[], options: InternalSpawnOptions): Promise<ChildProcess<IOPayload>> =>
        invoke<ChildProcess<IOPayload>>('plugin:shellx|execute', {
          program: program,
          args: args,
          options: options
        })
    ),
    kill: checkPermission<ShellPermission>(
      ShellPermissionMap.kill,
      permissions
    )((pid: number) =>
      invoke<void>('plugin:shellx|kill', {
        cmd: 'killChild',
        pid: pid
      })
    ),
    stdinWrite: checkPermission<ShellPermission>(
      ShellPermissionMap.stdinWrite,
      permissions
    )((buffer: string | number[], pid: number) =>
      invoke('plugin:shellx|stdin_write', {
        buffer: buffer,
        pid: pid
      })
    ),
    open: checkPermission<ShellPermission>(['shell:open'], permissions)(open),
    rawSpawn: checkPermission<ShellPermission>(
      ShellPermissionMap.rawSpawn,
      permissions
    )(
      <O extends IOPayload>(
        program: string,
        args: string[],
        options: InternalSpawnOptions,
        cb: (evt: CommandEvent<O>) => void
      ): Promise<number> => {
        const onEvent = new Channel<CommandEvent<O>>()
        onEvent.onmessage = cb
        return invoke<number>('plugin:shellx|spawn', {
          program: program,
          args: args,
          options: options,
          onEvent
        })
      }
    ),
    executeBashScript: checkPermission<ShellPermission>(
      ShellPermissionMap.executeBashScript,
      permissions
    )(executeBashScript),
    executePowershellScript: checkPermission<ShellPermission>(
      ShellPermissionMap.executePowershellScript,
      permissions
    )(executePowershellScript),
    executeAppleScript: checkPermission<ShellPermission>(
      ShellPermissionMap.executeAppleScript,
      permissions
    )(executeAppleScript),
    executePythonScript: checkPermission<ShellPermission>(
      ShellPermissionMap.executePythonScript,
      permissions
    )(executePythonScript),
    executeZshScript: checkPermission<ShellPermission>(
      ShellPermissionMap.executeZshScript,
      permissions
    )(executeZshScript),
    executeNodeScript: checkPermission<ShellPermission>(
      ShellPermissionMap.executeNodeScript,
      permissions
    )(executeNodeScript),
    hasCommand: checkPermission<ShellPermission>(ShellPermissionMap.hasCommand, permissions)(hasCommand),
    likelyOnWindows: checkPermission<ShellPermission>(ShellPermissionMap.likelyOnWindows, permissions)(likelyOnWindows)
  }
}
