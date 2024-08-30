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
import { constructServerAPIWithPermissions, exposeApiToWindow, exposeApiToWorker } from 'tauri-api-adapter'
import type { AllPermission } from 'tauri-api-adapter/permissions'

const permissions: AllPermission[] = [
  'clipboard:read-all',
  'fetch:all',
  'dialog:all',
  'fs:read',
  'fs:write',
  'notification:all',
  'os:all',
  'shell:execute',
  'shell:open',
  'updownload:download',
  'updownload:upload',
  'system-info:all',
  'network:port',
  'network:interface'
]
const serverAPI = constructServerAPIWithPermissions(permissions)

exposeApiToWindow(iframe.contentWindow, serverAPI)

// Or expose to worker
const worker = new Worker('worker.js')
exposeApiToWorker(worker, serverAPI)
```

### Client

Within iframe or web worker (no access to native Tauri APIs)

I call it client because it calls the API.

```ts
import { clipboard, defaultClientAPI, network, sysInfo } from 'tauri-api-adapter/iframe'
import { clipboard, defaultClientAPI, network, sysInfo } from 'tauri-api-adapter/worker'

console.log('Clipboard Text: ', await clipboard.readText())
console.log(await sysInfo.cpuInfo())
console.log(await network.getNonEmptyInterfaces())
```

## Permission Control

Permission control is provided by the package to limit API access from iframe and web worker.

> Tauri 2 comes with a nice and strict permission control system for Tauri Plugins. However it doesn't allow dynamic permission control. Permissions for each window is hard coded during compilation.
>
> In cases where you want to dynamically load content with iframe or web worker, this library gives you the ability to control the permission of each iframe and web worker.

To limit the API access, you need to construct the API object manually.

In the main window, you can construct the API object like this:

The API constructors takes in a list of permission strings. The type can be found in the `src/permission`. You can also find the type in the documentation.

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

To add support for a new API, add a file to `src/api/server/` and `src/api/client/` (may not be necessary).

Add the API type to `src/api/client/types`.

Implement the type in server and client.

Also look at `src/iframe.ts` and `src/worker.ts` to see how the API is exposed to iframe and worker.
