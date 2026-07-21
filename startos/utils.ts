import { sdk } from './sdk'

export const swarmPort = 4001
export const rpcPort = 5001
export const gatewayPort = 8080

// Host ids (the `sdk.MultiHost.of` groups) — distinct from the interface ids
// exported on them.
export const rpcHostId = 'rpc-multi'
export const gatewayHostId = 'gateway-multi'
export const swarmHostId = 'swarm-multi'

export const rpcInterfaceId = 'rpc'
export const gatewayInterfaceId = 'gateway'
export const swarmInterfaceId = 'swarm'

export const mounts = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: '/data/ipfs',
  readonly: false,
})
