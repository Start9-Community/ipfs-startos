import { utils } from '@start9labs/start-sdk'
import { resetPassword } from '../actions/resetPassword'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const taskSetPassword = sdk.setupOnInit(async (effects) => {
  if (await storeJson.read((s) => s.passwordSet).const(effects)) return

  // The RPC API is never left open: until the owner creates a password, it takes one nobody knows.
  if (!(await storeJson.read((s) => s.password).once())) {
    await storeJson.merge(effects, {
      password: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 32 }),
    })
  }

  await sdk.action.createOwnTask(effects, resetPassword, 'important', {
    reason: i18n(
      'Create the password that protects the Admin Portal and the RPC API',
    ),
  })
})
