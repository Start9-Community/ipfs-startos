# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `ipfs`.** Packages the Kubo IPFS node. Exposes three hosts/interfaces: `rpc` (private admin/Web UI), `gateway` (public IPFS/IPNS gateway), and `swarm` (P2P). Host-id and interface-id constants live in `startos/utils.ts`.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach ipfs -n ipfs -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `ipfs-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
