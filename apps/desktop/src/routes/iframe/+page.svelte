<script lang="ts">
  import { attachConsole, error, info, trace } from '@tauri-apps/plugin-log'
  import { onMount } from 'svelte'
  import {
    defaultServerAPI,
    exposeApiToWindow,
    exposeApiToWorker,
    getWindowApiClient,
    isInIframe,
    isInWorker,
    isMain,
    path,
    utils
  } from 'tauri-api-adapter'
  import { clipboard } from 'tauri-api-adapter/api/clipboard'
  import iframeApi from 'tauri-api-adapter/iframe'
  import nativeApi from 'tauri-api-adapter/native'

  let clipboardText: string

  onMount(async () => {
    // iframeApi.updownload
    //   .download('https://github.com/huakunshen.png', '/Users/hacker/Downloads/avatar.png', (progress) => {
    //     console.log('iframe Downloading png: ', progress)
    //   })
    //   .then(() => {
    //     console.log('iframe Downloaded png')
    //   })
    setTimeout(async () => {
      iframeApi.sysInfo.components().then((components) => {
        console.log('iframe Components: ', components)
      })
      iframeApi.sysInfo.staticInfo().then((info) => {
        console.log('iframe Static Info: ', info)
      })
      clipboard.readText().then((text) => {
        console.log('iframe Clipboard Text: ', text)
        clipboardText = text
      })
      nativeApi.clipboard.readText().then((text) => {
        console.log('native API Clipboard Text: ', text)
      })
      console.log(
        'hack with __TAURI_INTERNALS__ in iframe',
        // @ts-ignore
        await window.parent.__TAURI_INTERNALS__.invoke('plugin:clipboard|read_text')
      )
    }, 1000)
  })
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold underline">iframe</h1>
  <h2>isMain: {isMain()}</h2>
  <h2>isInIframe: {isInIframe()}</h2>
  <h2>isInWorker: {isInWorker()}</h2>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={() => {
      iframeApi.clipboard.readText().then((text) => {
        console.log('iframe Clipboard Text: ', text)
        clipboardText = text
      })
    }}>Read Clipboard Text</button
  >
  <span>
    <strong class="font-bold">clipboardText:</strong>
    <pre>{clipboardText}</pre>
  </span>
</div>
