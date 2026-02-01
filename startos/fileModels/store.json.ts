import { matches, FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const { object, string } = matches

const shape = object({
  password: string.nullable().onMismatch(null),
})

export const storeJson = FileHelper.json(
  {
    base: sdk.volumes.startos,
    subpath: '/store.json',
  },
  shape,
)
