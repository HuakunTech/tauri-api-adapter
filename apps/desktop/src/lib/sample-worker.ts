import {
  getWindowApiClient,
  getWorkerApiClient,
  isInIframe,
  isInWorker,
  isMain,
  type IFullAPI
} from 'tauri-api-adapter'

const client = getWorkerApiClient<IFullAPI>()

client.clipboardReadText().then((text) => {
  console.log('Clipboard text from worker:', text)
})

console.log('worker isInIframe:', isInIframe())
console.log('worker isInWorker:', isInWorker())
console.log('worker isMain:', isMain())
