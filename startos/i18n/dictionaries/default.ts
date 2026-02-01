export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting IPFS!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  'Admin Portal (private)': 4,
  'Your private admin portal': 5,
  'Public Gateway': 6,
  'Your public web gateway': 7,
  'Swam P2P': 8,
  'Your IPFS node on the P2P network': 9,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
