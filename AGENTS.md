# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The admin portal is unauthenticated, and the auth path is commented out in four places** — `actions/resetPassword.ts`, its registration in `actions/index.ts`, `init/taskSetPassword.ts`, and the `API.Authorizations` block plus the `username` field in `interfaces.ts`/`main.ts`. Anyone reaching port 5001 can reconfigure the node. Finishing that work means re-enabling all of them together; leaving it half-done is worse than either state.
- **Kubo's config is written through its own CLI on every start, not modelled.** The values are derived from the addresses the server currently has — API origins from the admin interface, the public-gateway table from the gateway interface — so they cannot be a static file, and an address change is picked up by restarting.
- **`runAsInit: true` is required** — the upstream image expects to be PID 1.
- **`ipfs init` runs once, gated on `kind === 'install'`.** It generates the node's peer identity; running it again would replace that identity and orphan every address others use to reach the node.
- **The `chown` oneshot must stay ordered after `config`.** The config step writes as root; without the chown afterwards the daemon cannot read its own data directory.
