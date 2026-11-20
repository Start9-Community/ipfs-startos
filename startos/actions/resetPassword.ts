import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { rpcUsername } from '../utils'

export const resetPassword = sdk.Action.withoutInput(
  // id
  'reset-password',

  // metadata
  async ({ effects }) => {
    const isSet = await storeJson.read((s) => s.passwordSet).const(effects)
    return {
      name: isSet
        ? i18n('Reset Admin Password')
        : i18n('Create Admin Password'),
      description: isSet
        ? i18n('Generate a new password for the Admin Portal and the RPC API')
        : i18n('Generate the password for the Admin Portal and the RPC API'),
      warning: isSet
        ? i18n(
            'Replaces the current admin password and restarts IPFS. The Admin Portal and any tool using the old password lose access until you give them the new one.',
          )
        : null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    })
    await storeJson.merge(effects, { password, passwordSet: true })

    return {
      version: '1',
      title: i18n('Admin Credentials'),
      message: i18n(
        'Save the password to a password manager. When the Admin Portal asks for its Kubo RPC API address, enter `https://admin:<password>@<host>`, where `<host>` is the hostname, with its port if it has one, of the address you opened the portal at.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: rpcUsername,
            masked: false,
            copyable: true,
            qr: false,
            launchable: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
            launchable: false,
          },
        ],
      },
    }
  },
)
