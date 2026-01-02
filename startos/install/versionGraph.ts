import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { sdk } from '../sdk'
import { mounts } from '../utils'
import { storeJson } from '../fileModels/store.json'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'ipfs' },
      mounts,
      'init',
      async (sub) => sub.execFail(['ipfs', 'init']),
    )
    await storeJson.write(effects, { password: null })
  },
})
