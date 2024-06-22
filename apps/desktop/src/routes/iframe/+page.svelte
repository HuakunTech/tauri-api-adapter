<script lang="ts">
  import { onMount } from 'svelte'
  import * as iframeApi from 'tauri-api-adapter/iframe'
  import * as nativeApi from 'tauri-api-adapter/native'
  import { defaultServerAPI, exposeApiToWindow, exposeApiToWorker, utils, isMain, isInIframe, isInWorker } from 'tauri-api-adapter'


  onMount(async () => {
    // window.parent = {
    //   postMessage: window.parent.postMessage
    // }
    // window.eval(`
    //   window.parent = {
    //     postMessage: window.parent.postMessage
    //   }
    // `)
    setTimeout(async () => {
      iframeApi.clipboard.readText().then((text) => {
        console.log('iframe Clipboard Text: ', text)
      })
      nativeApi.clipboard.readText().then((text) => {
        console.log('native API Clipboard Text: ', text)
      })

      console.log(
        'hack with __TAURI_INTERNALS__',
        await window.parent.__TAURI_INTERNALS__.invoke('plugin:clipboard|read_text')
      )
    }, 1000)
  })
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold underline">iframe</h1>
  <h2>isMain: {isMain}</h2>
  <h2>isInIframe: {isInIframe}</h2>
  <h2>isInWorker: {isInWorker}</h2>
</div>
