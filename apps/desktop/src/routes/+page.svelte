<script lang="ts">
  import { onMount } from 'svelte'
  import {
    constructClipboardApi,
    //   clipboard,
    //   constructClipboardApi,
    //   constructSystemInfoApi,
    //   defaultServerAPI,
    //   exposeApiToWindow,
    //   exposeApiToWorker,
    //   isInIframe,
    //   isInWorker,
    //   isMain,
    //   updownload,
    //   utils
    constructServerAPIWithPermissions,
    exposeApiToWindow
  } from 'tauri-api-adapter'
  import SampleWorker from '../lib/sample-worker?worker'

  let iframe: HTMLIFrameElement

  onMount(async () => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'RELEASE') {
        console.count('comlink release, will re-expose APIs')
      }
    })
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
    // exposeApiToWorker(worker, defaultServerAPI)
    if (!(iframe && iframe.contentWindow)) {
      return
    } else {
      // utils.isolateIframeFromTauri(iframe.contentWindow)

      exposeApiToWindow(iframe.contentWindow, {
        clipboard: constructClipboardApi(['clipboard:read-all'])
      })
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
