import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'ipfs',
  title: 'IPFS',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/ipfs-startos',
  upstreamRepo: 'https://github.com/ipfs/go-ipfs',
  supportSite: 'https://github.com/Start9Labs/ipfs-startos/issues',
  marketingSite: 'https://ipfs.tech/',
  donationUrl: null,
  docsUrl:
    'https://github.com/Start9Labs/ipfs-startos/blob/master/instructions.md',
  description: {
    short: 'InterPlanetary File System',
    long: `A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web upgradeable, resilient, and more open.`,
  },
  volumes: ['main', 'startos'],
  images: {
    ipfs: {
      source: { dockerTag: 'ipfs/kubo:v0.39.0' },
    },
  },
  dependencies: {},
})
