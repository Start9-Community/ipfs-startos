// import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  gatewayHostId,
  gatewayInterfaceId,
  gatewayPort,
  rpcHostId,
  rpcInterfaceId,
  rpcPort,
  swarmHostId,
  swarmInterfaceId,
  swarmPort,
} from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  // rpc

  // const password = await storeJson.read((s) => s.password).const(effects)

  const rpcMulti = sdk.MultiHost.of(effects, rpcHostId)
  const rpcMultiOrigin = await rpcMulti.bindPort(rpcPort, {
    protocol: 'http',
  })
  const rpc = sdk.createInterface(effects, {
    name: i18n('Admin Portal (private)'),
    id: rpcInterfaceId,
    description: i18n('Your private admin portal'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    // username: `admin:${password}`,
    username: null,
    path: '/webui',
    query: {},
  })
  const rpcReceipt = await rpcMultiOrigin.export([rpc])

  // gateway

  const gatewayMulti = sdk.MultiHost.of(effects, gatewayHostId)
  const gatewayMultiOrigin = await gatewayMulti.bindPort(gatewayPort, {
    protocol: 'http',
  })
  const gateway = sdk.createInterface(effects, {
    name: i18n('Public Gateway'),
    id: gatewayInterfaceId,
    description: i18n('Your public web gateway'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '/ipfs',
    query: {},
  })
  const gatewayReceipt = await gatewayMultiOrigin.export([gateway])

  // swarm

  const swarmMulti = sdk.MultiHost.of(effects, swarmHostId)
  const swarmMultiOrigin = await swarmMulti.bindPort(swarmPort, {
    protocol: null,
    addSsl: null,
    preferredExternalPort: swarmPort,
    secure: { ssl: false },
  })
  const swarm = sdk.createInterface(effects, {
    name: i18n('Swam P2P'),
    id: swarmInterfaceId,
    description: i18n('Your IPFS node on the P2P network'),
    type: 'p2p',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })
  const swarmReceipt = await swarmMultiOrigin.export([swarm])

  return [rpcReceipt, gatewayReceipt, swarmReceipt]
})
