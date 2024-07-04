<script lang="ts">
  import { onMount } from 'svelte'
  import {
    defaultServerAPI,
    exposeApiToWindow,
    exposeApiToWorker,
    getWindowApiClient,
    isInIframe,
    isInWorker,
    isMain,
    utils
  } from 'tauri-api-adapter'
  import * as iframeApi from 'tauri-api-adapter/iframe'
  import * as nativeApi from 'tauri-api-adapter/native'

  onMount(async () => {
    setTimeout(async () => {
      iframeApi.sysInfo.components().then((components) => {
        console.log('iframe Components: ', components)
      })
      iframeApi.sysInfo.staticInfo().then((info) => {
        console.log('iframe Static Info: ', info)
      })
      iframeApi.clipboard.readText().then((text) => {
        console.log('iframe Clipboard Text: ', text)
      })
      nativeApi.clipboard.readText().then((text) => {
        console.log('native API Clipboard Text: ', text)
      })

      console.log(
        'hack with __TAURI_INTERNALS__ in iframe',
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
