import { clipboard, dialog, shell } from 'tauri-api-adapter/worker'

clipboard.readText().then((text) => {
  console.log('From Worker: ', text)
})
shell.executeBashScript('echo "Hello from Worker"').then(console.log)
// dialog.confirm('Are you sure?').then((response) => {
//   console.log('From Worker: ', response)
// })
