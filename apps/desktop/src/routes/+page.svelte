<script lang="ts">
  import { onMount } from 'svelte'
  import clipboard from 'tauri-plugin-clipboard-api'

  onMount(async () => {
    console.log(await clipboard.readText())
  })
</script>
