<script lang="ts">
  import { onMount } from 'svelte'
  import { clipboard, defaultClientAPI } from 'tauri-api-adapter'
  import { Command, shell } from 'tauri-api-adapter/shell'

  onMount(async () => {
    // await clipboard.writeText('Hello from the parent page')
    // console.log(await clipboard.readText())

    // shell.likelyOnWindows().then(console.log)
    const cmd = Command.create('ffmpeg', [
      '-i',
      '/Users/hacker/Downloads/video.mp4',
      '/Users/hacker/Downloads/video.mov'
    ])
    cmd.on('close', (data) => {
      console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    })
    cmd.on('error', (error) => console.error(`command error: "${error}"`))
    cmd.stdout.on('data', (line) => console.log(`command stdout: "${line}"`))
    cmd.stderr.on('data', (line) => console.log(`command stderr: "${line}"`))
    const child = await cmd.spawn()
    console.log('pid:', child.pid)
  })
</script>

<h1>iframe</h1>
