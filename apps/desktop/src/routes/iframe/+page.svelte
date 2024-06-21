<script lang="ts">
  import { onMount } from 'svelte'
  import { utils } from 'tauri-api-adapter'
  import * as iframeApi from 'tauri-api-adapter/iframe'
  import * as nativeApi from 'tauri-api-adapter/native'

  onMount(async () => {
    // utils.hackIframeToUseParentWindow(window)
    console.log('iframe Clipboard Text: ', await iframeApi.clipboard.readText())
    // console.log('Native Clipboard Text: ', await nativeApi.clipboard.readText())
    // console.log(await iframeApi.sysInfo.cpuInfo())
    // console.log(await iframeApi.network.getNonEmptyInterfaces())

    // window.__TAURI_INTERNALS__ = window.parent.__TAURI_INTERNALS__
    // console.log(await clipboardAPI.readText())

    // const unlisten = listen(TauriEvent.WINDOW_BLUR, () => {
    //   console.log('Window is blurred')
    // })
  })
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold underline">iframe</h1>
</div>
