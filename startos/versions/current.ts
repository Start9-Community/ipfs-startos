import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.42.0:7',
  releaseNotes: {
    en_US: 'Updated to start-sdk 3.1.1 with container startup fixes.',
    es_ES:
      'Actualizado a start-sdk 3.1.1 con correcciones de inicio de contenedores.',
    de_DE:
      'Aktualisierung auf start-sdk 3.1.1 mit Fehlerbehebungen beim Containerstart.',
    pl_PL:
      'Zaktualizowano do start-sdk 3.1.1 z poprawkami uruchamiania kontenerów.',
    fr_FR:
      'Mise à jour vers start-sdk 3.1.1 avec des correctifs de démarrage des conteneurs.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
