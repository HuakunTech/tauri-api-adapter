import { expect, test } from 'bun:test'
import { constructServerAPIWithPermissions } from '../server'

test('Construct Server API', () => {
  const serverAPI = constructServerAPIWithPermissions(['clipboard:read-text', 'fs:exists'])
  expect(() => serverAPI.clipboardHasText()).toThrowError("Can't find variable: window")
  expect(() => serverAPI.clipboardReadHtml()).toThrowError("Can't find variable: window")
  expect(() => serverAPI.clipboardReadImageBase64()).toThrowError(
    'Permission denied for API "readImageBase64". Require one of these: [clipboard:read-all, clipboard:read-image]'
  )
})
