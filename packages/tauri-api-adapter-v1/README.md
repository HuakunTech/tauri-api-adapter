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

I call it server because it serves the API, execute the requests and return the result.

```ts
import { defaultServerAPI, exposeApiToWindow, exposeApiToWorker } from 'tauri-api-adapter'

exposeApiToWindow(iframe.contentWindow, defaultServerAPI)

// Or expose to worker
const worker = new Worker('worker.js')
exposeApiToWorker(worker, defaultServerAPI)
```

### Client

Within iframe or web worker (no access to native Tauri APIs)

I call it client because it calls the API.

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
This can also be used to lower the bundle size.

```ts
import { clipboard } from 'tauri-api-adapter/iframe'
import { clipboard } from 'tauri-api-adapter/worker'
```

## Permission Control

Permission control is provided by the package to limit API access from iframe and web worker.

> Tauri 2 comes with a nice and strict permission control system for Tauri Plugins. However it doesn't allow dynamic permission control. Permissions for each window is hard coded during compilation.
>
> In cases where you want to dynamically load content with iframe or web worker, this library gives you the ability to control the permission of each iframe and web worker.

```ts
import { defaultServerAPI, exposeApiToWindow, exposeApiToWorker } from 'tauri-api-adapter'

exposeApiToWindow(iframe.contentWindow, defaultServerAPI)
exposeApiToWorker(worker, defaultServerAPI)
```

`defaultServerAPI` by default exposes all APIs without any permission control.

To limit the API access, you need to construct the API object manually.

In the main window, you can construct the API object like this:

```ts
import {
  constructClipboardApi,
  constructSystemInfoApi,
  defaultServerAPI,
  exposeApiToWindow,
  exposeApiToWorker
} from 'tauri-api-adapter'

const clipboardAPI = constructClipboardApi(['clipboard:read-text', 'clipboard:write-image'])
const sysinfoApi = constructSystemInfoApi(['system-info:components', 'system-info:os'])
const api = {
  ...defaultServerAPI,
  ...clipboardAPI,
  ...sysinfoApi
}
exposeApiToWindow(iframe.contentWindow, api)
```

The API constructors takes in a list of permission strings. The type can be found in the `src/permission.ts` file. You can also find the type in the documentation.

With `clipboard:read-text` set, the clipboard API in iframe and worker will only have access to the `readText`, `readHtml`, `readRtf` functions. The image reading related functions will not be available.

## Extend API

This library provides a list of predefined APIs (which I personally use in my projects).

- clipboard
- dialog
- notification
- shell
- network
- system info
- os
- file system
- event

This doesn't mean you can only use the provided APIs.

You can extend the functionalities by adding more APIs.

This is the underlying function to expose and wrap APIs.

```ts
// Runs in the iframe or worker (I call it client because it calls the API)
export function getWorkerApiClient<API>(): Remote<API> {
  return wrap<API>(globalThis as Endpoint)
}
export function getWindowApiClient<API>(targetWindow: Window): Remote<API> {
  return wrap<API>(windowEndpoint(targetWindow))
}

// Run in the main window (I call it server because it serves the API, execute the requests and return the result)
export function exposeApiToWorker<API>(worker: Worker, api: API) {
  return expose(api, worker)
}
export function exposeApiToWindow<API>(win: Window, api: API) {
  return expose(api, windowEndpoint(win))
}
```

You just need to make sure the `API` generic type is the same for both the client and server.

To add server API, refer to `src/server.ts`.

To add client API, refer to `src/client.ts`.

Here is a minimal example to add a custom API.

```ts
// common interface
interface CustomAPI {
  customFunction: () => void
}
// server side (main webview window)
const customAPI: CustomAPI = {
  customFunction: () => {
    console.log('Custom Function')
  }
}
exposeApiToWorker<CustomAPI>(worker, customAPI)
exposeApiToWindow<CustomAPI>(iframe.contentWindow, customAPI)
// client side (iframe or worker)
const client = getWindowApiClient<CustomAPI>(window.parent)
const client = getWorkerApiClient<CustomAPI>()
client.customFunction()
```

You can experiment with the library and try adding your own custom APIs in the example project (`apps/desktop`).
