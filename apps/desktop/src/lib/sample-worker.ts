import { clipboard, dialog, fetch, shell } from 'tauri-api-adapter/worker'

clipboard.readText().then((text) => {
  console.log('From Worker: ', text)
})
clipboard.readFiles().then((files) => {
  console.log('Copied Files From Worker: ', files)
})
shell.executeBashScript('echo "Hello from Worker"').then(console.log)
// dialog.confirm('Are you sure?').then((response) => {
//   console.log('From Worker: ', response)
// })
fetch('https://ifconfig.co/country')
  .then((res) => res.text())
  .then((data) => {
    console.log('In Web Worker fetch ip country: ', data)
  })
