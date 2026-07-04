import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'ipfs',
  title: 'IPFS',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/ipfs-startos',
  upstreamRepo: 'https://github.com/ipfs/kubo',
  marketingUrl: 'https://ipfs.tech/',
  donationUrl: null,
  description: i18n.description,
  volumes: ['main', 'startos'],
  images: {
    ipfs: {
      source: { dockerTag: 'ipfs/kubo:v0.42.0' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
