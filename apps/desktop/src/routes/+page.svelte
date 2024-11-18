<script lang="ts">
  import { IframeParentIO, RPCChannel, WorkerParentIO, type DestroyableIoInterface } from 'kkrpc/browser'
  import { onMount } from 'svelte'
  import {
    constructClipboardApi,
    constructDialogApi,
    constructEventApi,
    constructFetchApi,
    constructFsApi,
    constructLoggerApi,
    constructNetworkApi,
    constructNotificationApi,
    constructOsApi,
    constructPathApi,
    //   clipboard,
    //   constructClipboardApi,
    //   constructSystemInfoApi,
    //   defaultServerAPI,
    //   isInIframe,
    //   isInWorker,
    //   isMain,
    //   updownload,
    //   utils
    constructServerAPIWithPermissions,
    constructShellApi,
    constructSystemInfoApi,
    constructUpdownloadApi
  } from 'tauri-api-adapter'
  import type { AllPermission } from 'tauri-api-adapter/permissions'
  import SampleWorker from '../lib/sample-worker?worker'

  let iframe: HTMLIFrameElement

  onMount(async () => {
    // updownload
    //   .download(
    //     'https://www.notion.so/desktop/mac-universal/download',
    //     '/Users/hacker/Downloads/gitkraken.dmg',
    //     (progress) => {
    //       console.log(progress)
    //     }
    //   )
    //   .then(() => {
    //     console.log('Downloaded gitkraken.dmg')
    //   })

    // clipboard.readText().then((text) => {
    //   console.log('native clipboard text in parent window:', text)
    // })
    const worker = new SampleWorker()
    // apply permission control
    // const cbApi = constructClipboardApi(['clipboard:read-all', 'clipboard:write-all'])
    // const sysinfoApi = constructSystemInfoApi(['system-info:components', 'system-info:os'])
    // const api = {
    //   ...defaultServerAPI,
    //   ...cbApi,
    //   ...sysinfoApi
    // }
    const permissions: AllPermission[] = [
      'clipboard:read-all',
      'fetch:all',
      'dialog:all',
      'fs:read',
      'fs:write',
      'notification:all',
      'os:all',
      'shell:execute',
      'shell:open',
      'updownload:download',
      'updownload:upload',
      'system-info:all',
      'network:port',
      'network:interface'
    ]
    const serverAPI = constructServerAPIWithPermissions(permissions)
    const io = new WorkerParentIO(worker)
    const rpc = new RPCChannel(io, {
      expose: serverAPI
    })
    if (!(iframe && iframe.contentWindow)) {
      return
    } else {
      // utils.isolateIframeFromTauri(iframe.contentWindow)
      const io = new IframeParentIO(iframe.contentWindow)
      const rpc = new RPCChannel(io, { expose: serverAPI })
      // utils.hackIframeToUseParentWindow(iframe.contentWindow)
    }
  })
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold underline">Parent Page</h1>
  <!-- <h2>isMain: {isMain}</h2>
  <h2>isInIframe: {isInIframe}</h2>
  <h2>isInWorker: {isInWorker}</h2> -->
  <!-- <iframe bind:this={iframe} title="iframe" src="/iframe" frameborder="0" class="border border-red-500 w-full h-64"></iframe> -->
  <iframe
    bind:this={iframe}
    title="iframe"
    src="http://localhost:4173"
    frameborder="0"
    class="border border-red-500 w-full h-96"
  ></iframe>
</div>
