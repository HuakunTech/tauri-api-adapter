# tauri-api-adapter

[![Generate and Deploy Docs](https://github.com/HuakunTech/tauri-api-adapter/actions/workflows/docs.yml/badge.svg)](https://github.com/HuakunTech/tauri-api-adapter/actions/workflows/docs.yml)
[![CI](https://github.com/HuakunTech/tauri-api-adapter/actions/workflows/ci.yml/badge.svg)](https://github.com/HuakunTech/tauri-api-adapter/actions/workflows/ci.yml)

### Documentation: https://huakuntech.github.io/tauri-api-adapter/

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
import { defaultServerAPI, exposeApiToWindow } from 'tauri-api-adapter'

exposeApiToWindow(iframe.contentWindow, defaultServerAPI)
```

### Client

```ts
import { clipboard, defaultClientAPI, network, sysInfo } from 'tauri-api-adapter'

console.log('Clipboard Text: ', await clipboard.readText())
console.log(await sysInfo.cpuInfo())
console.log(await network.getNonEmptyInterfaces())
```
