import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  password: z.string().nullable().catch(null),
})

export const storeJson = FileHelper.json(
  {
    base: sdk.volumes.startos,
    subpath: '/store.json',
  },
  shape,
)
