export function createWorker(code: string) {
  let blob = new Blob([code], {
    type: 'application/javascript'
  })
  const url = URL.createObjectURL(blob)
  return new Worker(url)
}
