<script lang="ts">
  import { onMount } from 'svelte'
  import * as iframeApi from 'tauri-api-adapter/iframe'

  onMount(async () => {
    console.log('iframe Clipboard Text: ', await iframeApi.clipboard.readText())
  })
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold underline">iframe</h1>
</div>
