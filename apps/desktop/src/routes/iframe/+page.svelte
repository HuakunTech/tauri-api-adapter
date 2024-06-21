<script lang="ts">
  import { onMount } from 'svelte'
  import { clipboard, defaultClientAPI } from 'tauri-api-adapter'

  onMount(async () => {
    await clipboard.writeText('Hello from the parent page')
    console.log(await clipboard.readText())
  })
</script>

<h1>iframe</h1>
