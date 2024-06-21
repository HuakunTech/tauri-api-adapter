<script lang="ts">
  import { onMount } from 'svelte'
  import { defaultServerAPI, exposeApiToWindow } from 'tauri-api-adapter'
  import clipboard from 'tauri-plugin-clipboard-api'

  let iframe: HTMLIFrameElement

  onMount(async () => {
    if (!iframe.contentWindow) {
      return
    } else {
      // iframe.contentWindow.parent.__TAURI_INTERNALS__ = null
      exposeApiToWindow(iframe.contentWindow, defaultServerAPI)
    }
  })
</script>

<h1>Parent Page</h1>
<iframe bind:this={iframe} title="iframe" src="/iframe" frameborder="0"></iframe>
