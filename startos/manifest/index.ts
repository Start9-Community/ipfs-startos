import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'ipfs',
  title: 'IPFS',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/ipfs-startos',
  upstreamRepo: 'https://github.com/ipfs/go-ipfs',
  supportSite: 'https://github.com/Start9Labs/ipfs-startos/issues',
  marketingSite: 'https://ipfs.tech/',
  donationUrl: null,
  docsUrl: 'https://docs.ipfs.tech/',
  description: i18n.description,
  volumes: ['main', 'startos'],
  images: {
    ipfs: {
      source: { dockerTag: 'ipfs/kubo:v0.39.0' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
