import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const current = VersionInfo.of({
  version: '0.42.0:2',
  releaseNotes: {
    en_US:
      'Updated Kubo (IPFS) to 0.42.0.\n\n' +
      'Highlights: announce CIDs on demand with the new `ipfs provide once` command; export and import partial CARs with `--local-only`; more reliable daemon shutdown and container health checks (`ipfs diag healthy`); and a fix for pin operations that could hang under pinned reprovide strategies. Note: nodes that set `Provide.DHT.Interval=0` must now also set `Provide.Enabled` explicitly.\n\n' +
      'Release notes: https://github.com/ipfs/kubo/releases/tag/v0.42.0\n\n' +
      'Also includes internal updates for start-sdk 2.0.',
    es_ES:
      'Kubo (IPFS) actualizado a 0.42.0.\n\n' +
      'Novedades: anuncia CIDs bajo demanda con el nuevo comando `ipfs provide once`; exporta e importa CARs parciales con `--local-only`; apagado del daemon y comprobaciones de estado del contenedor más fiables (`ipfs diag healthy`); y una corrección para operaciones de pin que podían bloquearse con estrategias de reprovisión por pins. Nota: los nodos que fijan `Provide.DHT.Interval=0` ahora también deben establecer `Provide.Enabled` de forma explícita.\n\n' +
      'Notas de la versión: https://github.com/ipfs/kubo/releases/tag/v0.42.0\n\n' +
      'También incluye actualizaciones internas para start-sdk 2.0.',
    de_DE:
      'Kubo (IPFS) auf 0.42.0 aktualisiert.\n\n' +
      'Highlights: CIDs bei Bedarf ankündigen mit dem neuen Befehl `ipfs provide once`; teilweise CARs exportieren und importieren mit `--local-only`; zuverlässigeres Herunterfahren des Daemons und Container-Health-Checks (`ipfs diag healthy`); sowie eine Korrektur für Pin-Operationen, die unter pin-basierten Reprovide-Strategien hängen bleiben konnten. Hinweis: Nodes mit `Provide.DHT.Interval=0` müssen jetzt zusätzlich `Provide.Enabled` explizit setzen.\n\n' +
      'Versionshinweise: https://github.com/ipfs/kubo/releases/tag/v0.42.0\n\n' +
      'Enthält außerdem interne Aktualisierungen für start-sdk 2.0.',
    pl_PL:
      'Zaktualizowano Kubo (IPFS) do 0.42.0.\n\n' +
      'Najważniejsze zmiany: ogłaszanie CID-ów na żądanie za pomocą nowego polecenia `ipfs provide once`; eksport i import częściowych plików CAR z `--local-only`; bardziej niezawodne zamykanie daemona i kontrole stanu kontenera (`ipfs diag healthy`); oraz poprawka operacji pin, które mogły się zawieszać przy strategiach reprovide opartych na pinach. Uwaga: węzły z ustawieniem `Provide.DHT.Interval=0` muszą teraz również jawnie ustawić `Provide.Enabled`.\n\n' +
      'Informacje o wydaniu: https://github.com/ipfs/kubo/releases/tag/v0.42.0\n\n' +
      'Zawiera również wewnętrzne aktualizacje dla start-sdk 2.0.',
    fr_FR:
      'Kubo (IPFS) mis à jour vers 0.42.0.\n\n' +
      'Points forts : annoncer des CID à la demande avec la nouvelle commande `ipfs provide once` ; exporter et importer des CAR partiels avec `--local-only` ; un arrêt du daemon et des contrôles de santé de conteneur plus fiables (`ipfs diag healthy`) ; et un correctif pour les opérations de pin qui pouvaient se bloquer avec les stratégies de reprovide basées sur les pins. Remarque : les nœuds réglés sur `Provide.DHT.Interval=0` doivent désormais aussi définir `Provide.Enabled` explicitement.\n\n' +
      'Notes de version : https://github.com/ipfs/kubo/releases/tag/v0.42.0\n\n' +
      'Inclut également des mises à jour internes pour start-sdk 2.0.',
  },
  migrations: {
    up: async ({ effects }) => {
      // remove old start9 dir
      await rm('/media/startos/volumes/main/start9', { recursive: true }).catch(
        console.error,
      )
    },
    down: IMPOSSIBLE,
  },
})
