import { sdk } from '../sdk'
import { mounts } from '../utils'
import { storeJson } from '../fileModels/store.json'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return
  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'ipfs' },
    mounts,
    'init',
    async (sub) => sub.execFail(['ipfs', 'init']),
  )
  await storeJson.merge(effects, {})
})
