import { VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_40_1_1_b2 = VersionInfo.of({
  version: '0.40.1:1-beta.2',
  releaseNotes: {
    en_US: 'Update to StartOS SDK beta.60',
    es_ES: 'Actualización a StartOS SDK beta.60',
    de_DE: 'Update auf StartOS SDK beta.60',
    pl_PL: 'Aktualizacja do StartOS SDK beta.60',
    fr_FR: 'Mise à jour vers StartOS SDK beta.60',
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
