import { assertType, describe, expect, test } from 'vitest'

import { localhost } from '../../chains'

import type { HttpTransport } from './http'
import { http } from './http'

test('default', () => {
  const transport = http({ url: 'https://mockapi.com/rpc' })

  assertType<HttpTransport>(transport)
  assertType<'http'>(transport({}).config.type)

  expect(transport({})).toMatchInlineSnapshot(`
    {
      "config": {
        "key": "http",
        "name": "HTTP JSON-RPC",
        "request": [Function],
        "type": "http",
      },
      "value": {
        "url": "https://mockapi.com/rpc",
      },
    }
  `)
})

describe('config', () => {
  test('key', () => {
    const transport = http({
      key: 'mock',
      url: 'https://mockapi.com/rpc',
    })({})

    expect(transport).toMatchInlineSnapshot(`
      {
        "config": {
          "key": "mock",
          "name": "HTTP JSON-RPC",
          "request": [Function],
          "type": "http",
        },
        "value": {
          "url": "https://mockapi.com/rpc",
        },
      }
    `)
  })

  test('name', () => {
    const transport = http({
      name: 'Mock Transport',
      url: 'https://mockapi.com/rpc',
    })({})

    expect(transport).toMatchInlineSnapshot(`
      {
        "config": {
          "key": "http",
          "name": "Mock Transport",
          "request": [Function],
          "type": "http",
        },
        "value": {
          "url": "https://mockapi.com/rpc",
        },
      }
    `)
  })

  test('url', () => {
    const transport = http({
      url: 'https://mockapi.com/rpc',
    })({})

    expect(transport).toMatchInlineSnapshot(`
      {
        "config": {
          "key": "http",
          "name": "HTTP JSON-RPC",
          "request": [Function],
          "type": "http",
        },
        "value": {
          "url": "https://mockapi.com/rpc",
        },
      }
    `)
  })
})

test('request', async () => {
  const transport = http({
    key: 'jsonRpc',
    name: 'JSON RPC',
  })({ chain: localhost })

  expect(
    await transport.config.request({ method: 'eth_blockNumber' }),
  ).toBeDefined()
})

test('no url', () => {
  expect(() => http()({})).toThrowErrorMatchingInlineSnapshot(
    `
    "No URL was provided to the Transport.

    Docs: https://viem.sh/TODO

    Details: A valid RPC URL is required to execute an Action. Please provide a valid RPC URL to the Transport.
    Version: viem@1.0.2"
  `,
  )
})