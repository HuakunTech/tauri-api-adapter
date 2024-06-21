import { IShell } from '@/api/client-types'
import { Comlink, defaultClientAPI } from '@/comlink'
import { EventType } from '@/constants'
import { PenxAPIResponseMessageEvent } from '@/util'
import * as shellx from 'tauri-plugin-shellx-api'
import { IOPayload } from 'tauri-plugin-shellx-api'

export class Child extends shellx.Child {
  write(data: IOPayload): Promise<void> {
    return shell.stdinWrite(typeof data === 'string' ? data : Array.from(data), this.pid)
  }

  kill(): Promise<void> {
    return shell.kill(this.pid)
  }
}

export class Command<O extends IOPayload> extends shellx.Command<O> {
  static create<O extends IOPayload>(
    program: string,
    args: string | string[] = [],
    options?: shellx.SpawnOptions
  ): Command<O> {
    return new Command(program, args, options)
  }

  async spawn(): Promise<Child> {
    const args = this.args

    if (typeof args === 'object') {
      Object.freeze(args)
    }

    return shell
      .rawSpawn<O>(
        this.program,
        args,
        this.options,
        Comlink.proxy((evt) => {
          switch (evt.event) {
            case 'Error':
              this.emit('error', evt.payload)
              break
            case 'Terminated':
              this.emit('close', evt.payload)
              break
            case 'Stdout':
              this.stdout.emit('data', evt.payload)
              break
            case 'Stderr':
              this.stderr.emit('data', evt.payload)
              break
          }
        })
      )
      .then((pid) => new Child(pid))
  }

  async execute(): Promise<shellx.ChildProcess<O>> {
    const program = this.program
    const args = this.args
    const options = this.options

    if (typeof args === 'object') {
      Object.freeze(args)
    }
    // return shellxExecute({ program, args, options }) as Promise<shellx.ChildProcess<O>>
    return shell.execute(program, args, options) as Promise<shellx.ChildProcess<O>>
  }
}

function makeBashScript(script: string): Command<string> {
  return Command.create('bash', ['-c', script])
}

function makePowershellScript(script: string): Command<string> {
  return Command.create('powershell', ['-Command', script])
}

function makeAppleScript(script: string): Command<string> {
  return Command.create('osascript', ['-e', script])
}

function makePythonScript(script: string): Command<string> {
  return Command.create('python', ['-c', script])
}

function makeZshScript(script: string): Command<string> {
  return Command.create('zsh', ['-c', script])
}

function makeNodeScript(script: string): Command<string> {
  return Command.create('node', ['-e', script])
}

const _shell: IShell = {
  execute: defaultClientAPI.shellExecute,
  kill: defaultClientAPI.shellKill,
  stdinWrite: defaultClientAPI.shellStdinWrite,
  open: defaultClientAPI.shellOpen,
  rawSpawn: defaultClientAPI.shellRawSpawn,
  makeBashScript,
  makePowershellScript,
  makeAppleScript,
  makePythonScript,
  makeZshScript,
  makeNodeScript,
  executeBashScript: defaultClientAPI.shellExecuteBashScript,
  executePowershellScript: defaultClientAPI.shellExecutePowershellScript,
  executeAppleScript: defaultClientAPI.shellExecuteAppleScript,
  executePythonScript: defaultClientAPI.shellExecutePythonScript,
  executeZshScript: defaultClientAPI.shellExecuteZshScript,
  executeNodeScript: defaultClientAPI.shellExecuteNodeScript,
  hasCommand: defaultClientAPI.shellHasCommand,
  likelyOnWindows: defaultClientAPI.shellLikelyOnWindows
}

export const shellOpen = _shell.open

export const shell = {
  ..._shell,
  Command,
  Child
}
