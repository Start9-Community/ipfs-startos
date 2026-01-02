import { sdk } from './sdk'

export const swarmPort = 4001
export const rpcPort = 5001
export const gatewayPort = 8080

export const mounts = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: '/data/ipfs',
  readonly: false,
})
