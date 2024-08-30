import { clipboard, dialog } from 'tauri-api-adapter/worker'

clipboard.readText().then((text) => {
  console.log('From Worker: ', text)
})
// dialog.confirm('Are you sure?').then((response) => {
//   console.log('From Worker: ', response)
// })
