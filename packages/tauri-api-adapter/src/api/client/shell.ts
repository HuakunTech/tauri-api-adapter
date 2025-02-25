import {
  Child as ShellxChild,
  Command as ShellxCommand,
  executeAppleScript as shellxExecuteAppleScript,
  executeBashScript as shellxExecuteBashScript,
  executeNodeScript as shellxExecuteNodeScript,
  executePowershellScript as shellxExecutePowershellScript,
  executePythonScript as shellxExecutePythonScript,
  executeZshScript as shellxExecuteZshScript,
  hasCommand as shellxHasCommand,
  killPid as shellxKillPid,
  likelyOnWindows as shellxLikelyOnWindows,
  makeAppleScript as shellxMakeAppleScript,
  makeBashScript as shellxMakeBashScript,
  makeNodeScript as shellxMakeNodeScript,
  makePowershellScript as shellxMakePowershellScript,
  makePythonScript as shellxMakePythonScript,
  makeZshScript as shellxMakeZshScript,
  open as shellxOpen,
  type ChildProcess,
  type IOPayload,
  type SpawnOptions
} from 'tauri-plugin-shellx-api'
import type { IShellServer } from '../server/types'
import type { IShell, IShellInternal } from './types'

export function constructShellAPI(api: IShellServer): IShell {
  class Child extends ShellxChild {
    write(data: IOPayload): Promise<void> {
      return api.stdinWrite(typeof data === 'string' ? data : Array.from(data), this.pid)
    }

    kill(): Promise<void> {
      return api.kill(this.pid)
    }
  }

  class Command<O extends IOPayload> extends ShellxCommand<O> {
    static create<O extends IOPayload>(
      program: string,
      args: string | string[] = [],
      options?: SpawnOptions
    ): Command<O> {
      return new Command(program, args, options)
    }

    async spawn(): Promise<Child> {
      const args = this.args

      if (typeof args === 'object') {
        Object.freeze(args)
      }

      return api
        .rawSpawn<O>(this.program, args, this.options, (evt) => {
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
        .then((pid) => new Child(pid))
    }

    async execute(): Promise<ChildProcess<O>> {
      const program = this.program
      const args = this.args
      const options = this.options

      if (typeof args === 'object') {
        Object.freeze(args)
      }
      return api.execute(program, args, options) as Promise<ChildProcess<O>>
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

  async function executeBashScript(script: string): Promise<ChildProcess<string>> {
    return makeBashScript(script).execute()
  }

  async function executePowershellScript(script: string): Promise<ChildProcess<string>> {
    return makePowershellScript(script).execute()
  }

  async function executeAppleScript(script: string): Promise<ChildProcess<string>> {
    return makeAppleScript(script).execute()
  }

  async function executePythonScript(script: string): Promise<ChildProcess<string>> {
    return makePythonScript(script).execute()
  }

  async function executeZshScript(script: string): Promise<ChildProcess<string>> {
    return makeZshScript(script).execute()
  }

  async function executeNodeScript(script: string): Promise<ChildProcess<string>> {
    return makeNodeScript(script).execute()
  }

  /**
   * Run powershell.exe -Command 'echo $env:OS' to determine if the current platform is likely to be Windows.
   * Not 100% accurate. If a Mac or Linux somehow has powershell.exe in PATH, this will return true.
   * @returns Whether the current platform is likely to be Windows.
   */
  function likelyOnWindows(): Promise<boolean> {
    return Command.create<string>('powershell.exe', ['-Command', 'echo $env:OS'])
      .execute()
      .then((out) => out.code === 0 && out.stdout.toLowerCase().includes('windows'))
      .catch(() => false)
  }

  /**
   * Determine if a command is available with `which` or `where` command.
   * Support Windows, Mac, Linux
   * @param command
   * @returns
   */
  async function hasCommand(command: string): Promise<boolean> {
    const targetCmd = command.split(' ')[0]
    const isOnWindows = await likelyOnWindows()
    const whereCmd = isOnWindows ? 'where' : 'which'
    const cmd = Command.create(whereCmd, [targetCmd])
    const out = await cmd.execute()
    return out.code === 0
  }

  return {
    open: api.open,
    killPid: api.killPid,
    makeBashScript,
    makePowershellScript,
    makeAppleScript,
    makePythonScript,
    makeZshScript,
    makeNodeScript,
    executeBashScript,
    executePowershellScript,
    executeAppleScript,
    executePythonScript,
    executeZshScript,
    executeNodeScript,
    hasCommand,
    likelyOnWindows,
    Command,
    Child
  }
}

export const nativeShell: IShell = {
  open: shellxOpen,
  killPid: shellxKillPid,
  makeBashScript: shellxMakeBashScript,
  makePowershellScript: shellxMakePowershellScript,
  makeAppleScript: shellxMakeAppleScript,
  makePythonScript: shellxMakePythonScript,
  makeZshScript: shellxMakeZshScript,
  makeNodeScript: shellxMakeNodeScript,
  executeBashScript: shellxExecuteBashScript,
  executePowershellScript: shellxExecutePowershellScript,
  executeAppleScript: shellxExecuteAppleScript,
  executePythonScript: shellxExecutePythonScript,
  executeZshScript: shellxExecuteZshScript,
  executeNodeScript: shellxExecuteNodeScript,
  hasCommand: shellxHasCommand,
  likelyOnWindows: shellxLikelyOnWindows,
  Command: ShellxCommand,
  Child: ShellxChild
}
