<script lang="ts">
  import { onMount } from 'svelte'
  import { clipboard, defaultClientAPI, network, sysInfo } from 'tauri-api-adapter'
  import { Command, shell } from 'tauri-api-adapter/shell'

  onMount(async () => {
    // await clipboard.writeText('Hello from the iframe page')
    console.log('Clipboard Text: ', await clipboard.readText())
    console.log(await sysInfo.cpuInfo())
    console.log(await network.getNonEmptyInterfaces())
  })
</script>

<h1>iframe</h1>
