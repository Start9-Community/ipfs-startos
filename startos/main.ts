// import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { rpcPort, mounts, gatewayPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info(i18n('Starting IPFS!'))

  // const password = await storeJson.read((s) => s.password).const(effects)
  // if (!password) {
  //   throw new Error('password not found')
  // }

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'ipfs' },
    mounts,
    'ipfs-sub',
  )

  const rpcAddresses =
    (await sdk.serviceInterface
      .getOwn(effects, 'rpc', (i) => i?.addressInfo?.nonLocal.format('url'))
      .const()) || []

  const publicGateways = await sdk.serviceInterface
    .getOwn(effects, 'gateway', (i) =>
      i?.addressInfo?.nonLocal.hostnames
        .map((h) => h.hostname.value)
        .reduce(
          (obj, curr) => ({
            ...obj,
            [curr]: {
              UseSubdomains: true,
              Paths: ['/ipfs', '/ipns'],
            },
          }),
          {},
        ),
    )
    .const()

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects)
    .addOneshot('config', {
      subcontainer: subcontainer,
      exec: {
        fn: async (sub) => {
          const prefix = ['ipfs', 'config']
          await sub.exec([
            ...prefix,
            '--json',
            'API.HTTPHeaders.Access-Control-Allow-Origin',
            JSON.stringify(rpcAddresses.map((url) => url.origin)),
          ])
          await sub.exec([
            ...prefix,
            '--json',
            'API.HTTPHeaders.Access-Control-Allow-Methods',
            '["PUT","POST"]',
          ])
          await sub.exec([
            ...prefix,
            '--json',
            'Addresses.API',
            `"/ip4/0.0.0.0/tcp/${rpcPort}"`,
          ])
          await sub.exec([
            ...prefix,
            '--json',
            'Addresses.Gateway',
            `"/ip4/0.0.0.0/tcp/${gatewayPort}"`,
          ])
          // await sub.exec([
          //   ...prefix,
          //   '--json',
          //   'API.Authorizations',
          //   JSON.stringify({
          //     Admin: {
          //       AuthSecret: `basic:admin:${password}`,
          //       AllowedPaths: ['/api/v0'],
          //     },
          //   }),
          // ])
          // await sub.exec([
          //   ...prefix,
          //   '--json',
          //   'API.HTTPHeaders.Access-Control-Allow-Credentials',
          //   '["true"]',
          // ])
          await sub.exec([
            ...prefix,
            '--json',
            'Gateway.PublicGateways',
            JSON.stringify(publicGateways),
          ])
          await sub.exec([
            ...prefix,
            '--bool',
            'Swarm.RelayClient.Enabled',
            'true',
          ])
          await sub.exec([
            ...prefix,
            '--bool',
            'Swarm.Transports.Network.Relay',
            'true',
          ])

          return null
        },
      },
      requires: [],
    })
    .addOneshot('chown', {
      subcontainer,
      exec: {
        command: ['chown', '-R', '1000:1000', '/data/ipfs'],
      },
      requires: ['config'],
    })
    .addDaemon('primary', {
      subcontainer,
      exec: { command: sdk.useEntrypoint(), runAsInit: true },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, rpcPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['chown'],
    })
})
