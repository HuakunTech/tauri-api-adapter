<script lang="ts">
  import { onMount } from 'svelte'
  import { defaultServerAPI, exposeApiToWindow } from 'tauri-api-adapter'
  import clipboard from 'tauri-plugin-clipboard-api'

  let iframe: HTMLIFrameElement

  onMount(async () => {
    console.log(await clipboard.readText())
    if (!iframe.contentWindow) {
      console.error('iframe window not found')
      return
    } else {
      exposeApiToWindow(iframe.contentWindow, defaultServerAPI)
    }
    console.log('tauri window API', window)
  })
</script>

<h1>Parent Page</h1>
<iframe bind:this={iframe} title="iframe" src="/iframe" frameborder="0"></iframe>
