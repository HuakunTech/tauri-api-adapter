# tauri-api-adapter

![NPM Version](https://img.shields.io/npm/v/tauri-api-adapter)
[![Generate and Deploy Docs](https://github.com/HuakunShen/tauri-api-adapter/actions/workflows/docs.yml/badge.svg)](https://github.com/HuakunShen/tauri-api-adapter/actions/workflows/docs.yml)
[![CI](https://github.com/HuakunShen/tauri-api-adapter/actions/workflows/ci.yml/badge.svg)](https://github.com/HuakunShen/tauri-api-adapter/actions/workflows/ci.yml)

### Documentation: https://huakunshen.github.io/tauri-api-adapter/

Regular Tauri APIs allow communication between Rust and JavaScript, so system APIs can be called from JavaScript.

This package provides a way to call Tauri APIs from iframe and web worker.

## Potential use cases:

1. Use Tauri APIs within iframe
2. Use Tauri APIs within web worker
3. Build extension with iframe and web worker

## Usage

### Server

Within Regular Webview (have access to Tauri APIs)

```ts
import { defaultServerAPI, exposeApiToWindow, exposeApiToWorker } from 'tauri-api-adapter'

exposeApiToWindow(iframe.contentWindow, defaultServerAPI)

// Or expose to worker
const worker = new Worker('worker.js')
exposeApiToWorker(worker, defaultServerAPI)
```

### Client

```ts
import { clipboard, defaultClientAPI, network, sysInfo } from 'tauri-api-adapter'

console.log('Clipboard Text: ', await clipboard.readText())
console.log(await sysInfo.cpuInfo())
console.log(await network.getNonEmptyInterfaces())
```

#### Multi Environment

This package supports multiple environments:

1. Regular Webview
2. iframe
3. Web Worker

```ts
// You can import the following functions to check the environment
// This can be used for debug. I wrote the logic to check the environment in the package.
// But it's possible the auto infer logic is wrong.
// In that case you need to import from the correct subpackage
import { isInIframe, isInWorker, isMain } from 'tauri-api-adapter'
```

The imported api objects are auto inferred based on the environment.

If you are in a regular WebView, the returned object will call Tauri APIs the regular way.

If you are in iframe or worker, the returned API object behaves differently.

Just import and use directly, envrioment will be auto inferred.

```ts
import { clipboard, dialog, notification, shell } from 'tauri-api-adapter'
```

If envrioment is not auto inferred correctly, you can import from the correct subpackage.

```ts
import { clipboard } from 'tauri-api-adapter/iframe'
import { clipboard } from 'tauri-api-adapter/worker'
```

## TODO

- [ ] Plan to add permission control system to this package.
