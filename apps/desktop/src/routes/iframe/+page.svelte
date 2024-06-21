<script lang="ts">
  import { onMount } from 'svelte'
  import {
    clipboard,
    defaultClientAPI,
    listen,
    network,
    sysInfo,
    TauriEvent
  } from 'tauri-api-adapter'
  import { Command, shell } from 'tauri-api-adapter/shell'
  import clipboardAPI from 'tauri-plugin-clipboard-api'

  onMount(async () => {
    // await clipboard.writeText('Hello from the iframe page')
    console.log('Clipboard Text: ', await clipboard.readText())
    console.log(await sysInfo.cpuInfo())
    console.log(await network.getNonEmptyInterfaces())



    window.__TAURI_INTERNALS__ = window.parent.__TAURI_INTERNALS__
    console.log(await clipboardAPI.readText())


    
    // const unlisten = listen(TauriEvent.WINDOW_BLUR, () => {
    //   console.log('Window is blurred')
    // })
  })
</script>

<h1>iframe</h1>
