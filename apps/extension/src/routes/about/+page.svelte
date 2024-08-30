<script lang="ts">
  import { onMount } from 'svelte'
  import { clipboard } from 'tauri-api-adapter/iframe'

  let cbText = ''

  onMount(() => {
    clipboard.readText().then((text) => {
      console.log('text in iframe:', text)
      cbText = text
    })
  })

  function onClipboardRead() {
    clipboard.readText().then((text) => {
      console.log('text in iframe:', text)
      cbText = text
    })
  }
</script>

<h1>About Page</h1>
<button on:click={onClipboardRead}>Read Clipboard Text</button>
<a href="/">Go to Home Page</a>
<pre>{cbText}</pre>
