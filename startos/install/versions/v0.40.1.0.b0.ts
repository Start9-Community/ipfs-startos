import { VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_40_1_0_b0 = VersionInfo.of({
  version: '0.40.1:0-beta.0',
  releaseNotes: {
    en_US: 'Revamped for StartOS 0.4.0',
    es_ES: 'Renovado para StartOS 0.4.0',
    de_DE: 'Überarbeitet für StartOS 0.4.0',
    pl_PL: 'Przebudowany dla StartOS 0.4.0',
    fr_FR: 'Remanié pour StartOS 0.4.0',
  },
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
