import { VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_41_0_2 = VersionInfo.of({
  version: '0.41.0:2',
  releaseNotes: {
    en_US: 'Updated to start-sdk 1.5.2.',
    es_ES: 'Actualizado a start-sdk 1.5.2.',
    de_DE: 'Aktualisierung auf start-sdk 1.5.2.',
    pl_PL: 'Zaktualizowano do start-sdk 1.5.2.',
    fr_FR: 'Mise à jour vers start-sdk 1.5.2.',
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
