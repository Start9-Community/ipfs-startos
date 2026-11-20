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
  'Swarm P2P': 8,
  'Your IPFS node on the P2P network': 9,
  'Create Admin Password': 10,
  'Reset Admin Password': 11,
  'Generate the password for the Admin Portal and the RPC API': 12,
  'Generate a new password for the Admin Portal and the RPC API': 13,
  'Replaces the current admin password and restarts IPFS. The Admin Portal and any tool using the old password lose access until you give them the new one.': 14,
  'Admin Credentials': 15,
  'Save the password to a password manager. When the Admin Portal asks for its Kubo RPC API address, enter `https://admin:<password>@<host>`, where `<host>` is the hostname, with its port if it has one, of the address you opened the portal at.': 16,
  Username: 17,
  Password: 18,
  'Create the password that protects the Admin Portal and the RPC API': 19,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
