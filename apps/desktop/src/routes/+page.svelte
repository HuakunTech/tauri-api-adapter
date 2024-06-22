<script lang="ts">
  import { onMount } from 'svelte'
  import { defaultServerAPI, exposeApiToWindow, exposeApiToWorker, utils } from 'tauri-api-adapter'
  import SampleWorker from '../lib/sample-worker?worker'

  // import SampleWorker from '../lib/sample-worker.ts'
  // import { createWorker } from '../lib/worker'

  let iframe: HTMLIFrameElement

  onMount(async () => {
    const worker = new SampleWorker()
    worker.postMessage('Hello from parent')
    window.addEventListener('message', (event) => {
      console.log('Parent received message: ', event.data)
    })
    exposeApiToWorker(worker, defaultServerAPI)
    if (!(iframe && iframe.contentWindow)) {
      return
    } else {
      // utils.isolateIframeFromTauri(iframe.contentWindow)
      // iframe.contentWindow.parent.__TAURI_INTERNALS__ = null
      exposeApiToWindow(iframe.contentWindow, defaultServerAPI)
    }
  })
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold underline">Parent Page</h1>
  <iframe
    bind:this={iframe}
    title="iframe"
    src="/iframe"
    frameborder="0"
    class="border border-red-500"
  ></iframe>
</div>
