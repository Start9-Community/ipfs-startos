# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **The admin portal is unauthenticated, and the auth path is commented out in four places** — `actions/resetPassword.ts`, its registration in `actions/index.ts`, `init/taskSetPassword.ts`, and the `API.Authorizations` block plus the `username` field in `interfaces.ts`/`main.ts`. Anyone reaching port 5001 can reconfigure the node. Finishing that work means re-enabling all of them together; leaving it half-done is worse than either state.
- **Kubo's config is written through its own CLI on every start, not modelled.** The values are derived from the addresses the server currently has — API origins from the admin interface, the public-gateway table from the gateway interface — so they cannot be a static file, and an address change is picked up by restarting.
- **`runAsInit: true` is required** — the upstream image expects to be PID 1.
- **`ipfs init` runs once, gated on `kind === 'install'`.** It generates the node's peer identity; running it again would replace that identity and orphan every address others use to reach the node.
- **The `chown` oneshot must stay ordered after `config`.** The config step writes as root; without the chown afterwards the daemon cannot read its own data directory.
