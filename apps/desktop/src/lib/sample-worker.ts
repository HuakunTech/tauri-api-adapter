// import { getApiClient, getWindowApiClient, type IFullAPI } from 'tauri-api-adapter'

self.onmessage = (e: MessageEvent) => {
  console.log('Worker received message:', e.data)
  console.log(e.ports)
}

// const client = getWindowApiClient<IFullAPI>(window)
// client.clipboardReadText().then((text) => {
//   console.log('Clipboard text from worker:', text)
// })
