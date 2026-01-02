import { VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_39_0_0_a0 = VersionInfo.of({
  version: '0.39.0:0-alpha.0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // remove old start9 dir
      await rm('/media/startos/volumes/main/start9', { recursive: true }).catch(
        console.error,
      )
    },
    down: async ({ effects }) => {},
  },
})
