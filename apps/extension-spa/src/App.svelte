<script lang="ts">
  import { proxy, releaseProxy, windowEndpoint, wrap, type Remote } from '@huakunshen/comlink'
  import { onMount } from 'svelte'
  import { clipboard, getApiContext } from 'tauri-api-adapter/iframe'

  // const ctx = getApiContext()
  // const clipboardApi = clipboard(ctx)
  const api = wrap<any>(windowEndpoint(window.parent))
  // clipboardApi.readText().then(text => {

  // })
  // import {
  //   defaultServerAPI,
  //   exposeApiToWindow,
  //   exposeApiToWorker,
  //   getWindowApiClient,
  //   isInIframe,
  //   isInWorker,
  //   isMain,
  //   path,
  //   utils
  // } from 'tauri-api-adapter'

  // import { clipboard } from 'tauri-api-adapter/api/clipboard'
  // import iframeApi from 'tauri-api-adapter/iframe'
  // import nativeApi from 'tauri-api-adapter/native'
  // type ApiType = { clipboardReadText: () => Promise<string> }
  // let api: undefined | Remote<ApiType> = undefined
  let clipboardText: string

  onMount(async () => {
    function callback(result: string) {
      console.log("received in iframe: ", result)
    }
    api.a.add(1, 2, proxy(callback)).then((result) => {
      console.log('iframe Add: ', result)
    })
    // iframeApi.updownload
    //   .download('https://github.com/huakunshen.png', '/Users/hacker/Downloads/avatar.png', (progress) => {
    //     console.log('iframe Downloading png: ', progress)
    //   })
    //   .then(() => {
    //     console.log('iframe Downloaded png')
    //   })
    setTimeout(async () => {
      // iframeApi.sysInfo.components().then((components) => {
      //   console.log('iframe Components: ', components)
      // })
      // iframeApi.sysInfo.staticInfo().then((info) => {
      //   console.log('iframe Static Info: ', info)
      // })
      // clipboard.readText().then((text) => {
      //   console.log('iframe Clipboard Text: ', text)
      //   clipboardText = text
      // })
      // nativeApi.clipboard.readText().then((text) => {
      //   console.log('native API Clipboard Text: ', text)
      // })
      // console.log(
      //   'hack with __TAURI_INTERNALS__ in iframe'
      //   // @ts-ignore
      //   // await window.parent.__TAURI_INTERNALS__.invoke('plugin:clipboard|read_text')
      // )
    }, 4000)
  })

  function onClick() {
    // clipboard(ctx)
    //   .readText()
    //   .then((text) => {
    //     console.log('iframe Clipboard Text: ', text)
    //     clipboardText = text
    //   })
    // if (api) {
    //   api.clipboardReadText().then((text) => {
    //     console.log('iframe Clipboard Text: ', text)
    //     clipboardText = text
    //   })
    // } else {
    //   api = wrap<ApiType>(windowEndpoint(window.parent))
    //   onClick()
    // }
  }
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold underline">iframe</h1>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={onClick}
    >Read Clipboard Text</button
  >
  <span>
    <strong class="font-bold">clipboardText:</strong>
    <pre>{clipboardText}</pre>
  </span>
</div>
