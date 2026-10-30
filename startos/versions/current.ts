import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.42.0:7',
  releaseNotes: {
    en_US:
      'The instructions cover keeping your home IP private when you publish IPFS through StartTunnel.',
    es_ES:
      'Las instrucciones explican cómo mantener privada tu IP doméstica cuando publicas IPFS a través de StartTunnel.',
    de_DE:
      'Die Anleitung erklärt, wie Ihre Heim-IP-Adresse privat bleibt, wenn Sie IPFS über StartTunnel veröffentlichen.',
    pl_PL:
      'Instrukcje wyjaśniają, jak zachować prywatność domowego adresu IP, gdy publikujesz IPFS przez StartTunnel.',
    fr_FR:
      'Les instructions expliquent comment garder votre IP personnelle privée lorsque vous publiez IPFS via StartTunnel.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
