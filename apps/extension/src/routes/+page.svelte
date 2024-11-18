<script lang="ts">
  import { onMount } from 'svelte'
  import {
    clipboard,
    dialog,
    event,
    fetch,
    fs,
    log,
    network,
    notification,
    os,
    path,
    shell,
    sysInfo,
    updownload
  } from 'tauri-api-adapter/iframe'

  let cbText = ''

  onMount(async () => {
    clipboard.readText().then((text) => {
      console.log('text in iframe:', text)
      cbText = text
    })
    fetch('https://ifconfig.co/country')
      .then((res) => res.text())
      .then((data) => {
        console.log('In Iframe Extension fetch ip country: ', data)
      })
    // console.log(await os.platform())
    // console.log(await path.desktopDir())
    // console.log(path.BaseDirectory)

    const content = await fs.readTextFile('myproject/clip.go', { baseDir: path.BaseDirectory.Desktop })
    // console.log(content)
    // log.error('this is an error log')
    // notification.sendNotification('Hello from iframe')
    event.listen('tauri://blur', (e) => {
      console.log('blur event in iframe:', e)
    })
    // event.listen('tauri://drag-drop', (e) => {
    //   console.log(event)
    // })
    // dialog.confirm('Are you sure?').then(console.log)
    // const cmd = shell.Command.create("echo", ['Hello from iframe'])
    // cmd.execute().then(console.log)
    // shell.executeBashScript('echo "Hello from iframe"').then(console.log)
    // sysInfo.cpuInfo().then(console.log)
    // sysInfo.cpuCount().then(console.log)
    // network.getInterfaces().then(console.log)
    // updownload.download('https://github.com/huakunshen.png', '/Users/hacker/Desktop/avatar.png')
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
