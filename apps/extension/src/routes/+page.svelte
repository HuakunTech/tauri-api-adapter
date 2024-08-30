<script lang="ts">
  import { onMount } from 'svelte'
  import { clipboard, fetch, api } from 'tauri-api-adapter/iframe'

  let cbText = ''

  onMount(() => {
    clipboard.readText().then((text) => {
      console.log('text in iframe:', text)
      cbText = text
    })
    fetch('https://ifconfig.co/country')
      .then((res) => res.text())
      .then(console.log)
  })


  function onClipboardRead() {
    clipboard.readText().then((text) => {
      console.log('text in iframe:', text)
      cbText = text
    })
  }
</script>

<h1>Home Page</h1>
<button on:click={onClipboardRead}>Read Clipboard Text</button>
<a href="/about">Go to About Page</a>
<pre>{cbText}</pre>
