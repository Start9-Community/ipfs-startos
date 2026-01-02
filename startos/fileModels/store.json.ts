import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, string } = matches

const shape = object({
  password: string.nullable().onMismatch(null),
})

export const storeJson = FileHelper.json(
  {
    volumeId: 'startos',
    subpath: '/store.json',
  },
  shape,
)
