import { getWindowApiClient, getWorkerApiClient, type IFullAPI } from 'tauri-api-adapter'

const client = getWorkerApiClient<IFullAPI>()

client.clipboardReadText().then((text) => {
  console.log('Clipboard text from worker:', text)
})

// self.postMessage

// client.clipboardReadText().then((text) => {
//   console.log('Clipboard text from worker:', text)
// })
