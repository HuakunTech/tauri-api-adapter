window.__TAURI_ISOLATION_HOOK__ = (payload) => {
  // let's not verify or modify anything, just print the content from the hook
//   console.log('hook1', payload)
//   console.log(payload.cmd)
//   if (payload.cmd.includes('read_text')) {
//     console.log('reading clipboard text')
//     return
//   }
  return payload
}
