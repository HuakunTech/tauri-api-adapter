<script lang="ts">
  import { onMount } from 'svelte'
  import {
    clipboard,
    constructClipboardApi,
    defaultServerAPI,
    exposeApiToWindow,
    exposeApiToWorker,
    isInIframe,
    isInWorker,
    isMain,
    utils
  } from 'tauri-api-adapter'
  import SampleWorker from '../lib/sample-worker?worker'

  let iframe: HTMLIFrameElement

  onMount(async () => {
    clipboard.readText().then((text) => {
      console.log('native clipboard text in parent window:', text)
    })
    const worker = new SampleWorker()
    const cbApi = constructClipboardApi(['clipboard:read-all', 'clipboard:write-all'])
    const api = {
      ...defaultServerAPI,
      ...cbApi
    }
    exposeApiToWorker(worker, defaultServerAPI)
    if (!(iframe && iframe.contentWindow)) {
      return
    } else {
      // utils.isolateIframeFromTauri(iframe.contentWindow)
      exposeApiToWindow(iframe.contentWindow, api)
      // exposeApiToWindow(iframe.contentWindow, defaultServerAPI)
      utils.hackIframeToUseParentWindow(iframe.contentWindow)
    }
  })
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold underline">Parent Page</h1>
  <h2>isMain: {isMain}</h2>
  <h2>isInIframe: {isInIframe}</h2>
  <h2>isInWorker: {isInWorker}</h2>
  <iframe bind:this={iframe} title="iframe" src="/iframe" frameborder="0" class="border border-red-500"></iframe>
</div>
