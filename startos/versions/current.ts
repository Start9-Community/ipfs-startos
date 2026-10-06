import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '0.42.0:5',
  releaseNotes: {
    en_US: `Updated Kubo (IPFS) to 0.42.0.

Highlights: announce CIDs on demand with the new \`ipfs provide once\` command; export and import partial CARs with \`--local-only\`; more reliable daemon shutdown and container health checks (\`ipfs diag healthy\`); and a fix for pin operations that could hang under pinned reprovide strategies. Note: nodes that set \`Provide.DHT.Interval=0\` must now also set \`Provide.Enabled\` explicitly.

Release notes: https://github.com/ipfs/kubo/releases/tag/v0.42.0

- If IPFS was carried over from StartOS 0.3.5, the old API / Web UI and IPFS Gateway addresses are removed and their network ports freed. Their Tor addresses are not moved; add addresses to the Admin Portal and Public Gateway interfaces if you need them.
- The Swarm P2P interface's name is spelled correctly.`,
    es_ES: `Kubo (IPFS) actualizado a 0.42.0.

Novedades: anuncia CIDs bajo demanda con el nuevo comando \`ipfs provide once\`; exporta e importa CARs parciales con \`--local-only\`; apagado del daemon y comprobaciones de estado del contenedor más fiables (\`ipfs diag healthy\`); y una corrección para operaciones de pin que podían bloquearse con estrategias de reprovisión por pins. Nota: los nodos que fijan \`Provide.DHT.Interval=0\` ahora también deben establecer \`Provide.Enabled\` de forma explícita.

Notas de la versión: https://github.com/ipfs/kubo/releases/tag/v0.42.0

- Si IPFS se trasladó desde StartOS 0.3.5, se eliminan las antiguas direcciones de API / Web UI y de IPFS Gateway y se liberan sus puertos de red. Sus direcciones Tor no se trasladan; añada direcciones a las interfaces Portal de administración y Puerta de enlace pública si las necesita.
- El nombre de la interfaz Swarm P2P está escrito correctamente.`,
    de_DE: `Kubo (IPFS) auf 0.42.0 aktualisiert.

Highlights: CIDs bei Bedarf ankündigen mit dem neuen Befehl \`ipfs provide once\`; teilweise CARs exportieren und importieren mit \`--local-only\`; zuverlässigeres Herunterfahren des Daemons und Container-Health-Checks (\`ipfs diag healthy\`); sowie eine Korrektur für Pin-Operationen, die unter pin-basierten Reprovide-Strategien hängen bleiben konnten. Hinweis: Nodes mit \`Provide.DHT.Interval=0\` müssen jetzt zusätzlich \`Provide.Enabled\` explizit setzen.

Versionshinweise: https://github.com/ipfs/kubo/releases/tag/v0.42.0

- Wurde IPFS von StartOS 0.3.5 übernommen, werden die alten Adressen „API / Web UI“ und „IPFS Gateway“ entfernt und ihre Netzwerkports freigegeben. Ihre Tor-Adressen werden nicht übertragen; fügen Sie bei Bedarf den Schnittstellen Admin-Portal und Öffentliches Gateway Adressen hinzu.
- Der Name der Schnittstelle Swarm P2P ist richtig geschrieben.`,
    pl_PL: `Zaktualizowano Kubo (IPFS) do 0.42.0.

Najważniejsze zmiany: ogłaszanie CID-ów na żądanie za pomocą nowego polecenia \`ipfs provide once\`; eksport i import częściowych plików CAR z \`--local-only\`; bardziej niezawodne zamykanie daemona i kontrole stanu kontenera (\`ipfs diag healthy\`); oraz poprawka operacji pin, które mogły się zawieszać przy strategiach reprovide opartych na pinach. Uwaga: węzły z ustawieniem \`Provide.DHT.Interval=0\` muszą teraz również jawnie ustawić \`Provide.Enabled\`.

Informacje o wydaniu: https://github.com/ipfs/kubo/releases/tag/v0.42.0

- Jeśli IPFS został przeniesiony ze StartOS 0.3.5, stare adresy „API / Web UI” i „IPFS Gateway” zostają usunięte, a ich porty sieciowe zwolnione. Ich adresy Tor nie są przenoszone; w razie potrzeby dodaj adresy do interfejsów Portal administracyjny i Brama publiczna.
- Nazwa interfejsu Swarm P2P jest zapisana poprawnie.`,
    fr_FR: `Kubo (IPFS) mis à jour vers 0.42.0.

Points forts : annoncer des CID à la demande avec la nouvelle commande \`ipfs provide once\` ; exporter et importer des CAR partiels avec \`--local-only\` ; un arrêt du daemon et des contrôles de santé de conteneur plus fiables (\`ipfs diag healthy\`) ; et un correctif pour les opérations de pin qui pouvaient se bloquer avec les stratégies de reprovide basées sur les pins. Remarque : les nœuds réglés sur \`Provide.DHT.Interval=0\` doivent désormais aussi définir \`Provide.Enabled\` explicitement.

Notes de version : https://github.com/ipfs/kubo/releases/tag/v0.42.0

- Si IPFS a été repris de StartOS 0.3.5, les anciennes adresses « API / Web UI » et « IPFS Gateway » sont supprimées et leurs ports réseau libérés. Leurs adresses Tor ne sont pas déplacées ; ajoutez des adresses aux interfaces Portail d'administration et Passerelle publique si vous en avez besoin.
- Le nom de l'interface Swarm P2P est correctement orthographié.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.MultiHost.of(effects, 'main').retire()
      await sdk.MultiHost.of(effects, 'gateway').retire()
    },
    down: IMPOSSIBLE,
  },
})
