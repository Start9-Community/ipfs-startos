<p align="center">
  <img src="icon.png" alt="IPFS Logo" width="21%">
</p>

# IPFS on StartOS

> Everything not listed in this document should behave the same as upstream
> Kubo. If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable — see the Documentation
> section of `instructions.md` for links.

[Kubo](https://github.com/ipfs/kubo) is the reference IPFS implementation. This package runs a node, publishes its three surfaces — the admin API, the content gateway, and the peer-to-peer swarm — and rewrites its configuration on every start so the gateway knows the addresses it is actually reachable at.

- **Upstream repo:** <https://github.com/ipfs/kubo>
- **Wrapper repo:** <https://github.com/Start9-Community/ipfs-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One upstream image. The root `Dockerfile` replaces its `/etc/ssl/certs` with a current
CA bundle (the image has no package manager); that layer comes out once upstream ships
an image built on a fixed store.

| Property      | Value                                                    |
| ------------- | -------------------------------------------------------- |
| Image         | `ipfs/kubo`                                              |
| Architectures | x86_64, aarch64                                          |
| Entrypoint    | The image's own, via `sdk.useEntrypoint()` + `runAsInit` |

| Subcontainer | Purpose                                              |
| ------------ | ---------------------------------------------------- |
| `ipfs-sub`   | Two oneshots and the daemon — the one to `attach` to |

Two oneshots run before the daemon: one rewrites the node's configuration, the other fixes ownership on the data directory.

## Volume and Data Layout

Two volumes, one of which the container never sees.

| Volume    | Mount Point  | Purpose                                                      |
| --------- | ------------ | ------------------------------------------------------------ |
| `main`    | `/data/ipfs` | The node identity, its configuration, and every pinned block |
| `startos` | not mounted  | Package state                                                |

**The node's private key is on `main`**, and it is what gives this node its peer identity. Everything it has pinned is there too, which is what makes this volume grow.

## File Models

One model, holding only the admin password — because **Kubo's own configuration is not modelled at all**.

| File         | Format | Modelled                | Written by                         |
| ------------ | ------ | ----------------------- | ---------------------------------- |
| `store.json` | JSON   | Yes — `FileHelper.json` | Init and the admin-password action |

`store.json` holds `password` (the RPC API password) and `passwordSet` (whether the owner has created one through the action). Until they have, init stores a generated password nobody has seen, so the API is never open.

Kubo's configuration is instead rewritten on every start by a oneshot that shells out to the application's own configuration command. That is a deliberate choice rather than an oversight: the values being written are **derived from the addresses this server currently has**, so they cannot be a static file.

What it sets each start:

- **The API's allowed origins**, from the admin interface's own current addresses. Without this the web UI cannot call the API it is served from.
- **`API.Authorizations`**, a single entry `admin` with `AuthSecret` `basic:admin:<password>` from `store.json` and `AllowedPaths` `["/api/v0"]`. Kubo then refuses every `/api/v0` request (403) that lacks that HTTP Basic credential, except `/api/v0/version`.
- **The API and gateway bind addresses**, pinned so StartOS can reach them.
- **The public gateway table**, built from the gateway interface's current addresses, with subdomain resolution enabled for content paths.
- **Relay client and relay transport**, both on, so the node can be reached from behind a NAT.

**A hand edit to any of those keys is overwritten on the next start.** Anything Kubo lets you configure that is _not_ in that list is yours, and survives.

## Dependencies

None.

## Network Access and Interfaces

Three interfaces, and they differ in how exposed they should be.

| Interface              | Id        | Type | Port | Path     | Description                        |
| ---------------------- | --------- | ---- | ---- | -------- | ---------------------------------- |
| Admin Portal (private) | `rpc`     | ui   | 5001 | `/webui` | The node's admin interface and API |
| Public Gateway         | `gateway` | ui   | 8080 | `/ipfs`  | Serves content to anyone           |
| Swarm P2P              | `swarm`   | p2p  | 4001 | —        | The IPFS peer-to-peer network      |

**The admin portal's RPC API requires the admin password.** The API on port 5001 can add and remove pins, change configuration, and read the node's identity, so Kubo's `API.Authorizations` gates every `/api/v0` path behind HTTP Basic auth as user `admin`. Kubo answers a missing or wrong credential with a bare 403 and no `WWW-Authenticate` challenge, so a browser never prompts: the Web UI (served from the same port at `/webui`, which redirects to the bundled `/ipfs/<cid>`, and is not gated) loads, fails to reach the API, and shows its "Could not connect to the Kubo RPC" screen with a **Kubo RPC API address** field. Entering `https://admin:<password>@<host>` there (or under Settings) makes it send the credential; it keeps that address in the browser's local storage. Any other RPC client needs the same credential, e.g. `ipfs --api-auth basic:admin:<password> …`, including the `ipfs` CLI run by `start-cli package attach ipfs -n ipfs-sub` while the daemon is up.

The gateway is the opposite: it exists to be reachable, and serves content to whoever asks.

**The gateway's address list is baked into the node's configuration at start**, which is why adding or removing an address for it needs a restart to take effect.

The interfaces live on hosts `rpc-multi`, `gateway-multi` and `swarm-multi`. An install carried over from StartOS 0.3.5 also had hosts `main` (port 5001) and `gateway` (port 8080) from the old package; the update to `0.42.0:5` retires both, freeing their ports and dropping their addresses. Their onions are not moved to the current hosts.

## Installation and First-Run Flow

Install initializes the node once, generating its identity, and seeds the store. Init then stores a generated RPC password nobody has seen and raises an important task to run **Create Admin Password**; the service starts and the gateway and swarm work meanwhile, but nothing can use the RPC API (so the Web UI cannot connect) until the owner runs it.

On every start, the configuration oneshot re-derives the origin and gateway settings from the addresses the server currently has, then the daemon comes up. That is why an address change is picked up by restarting rather than by editing anything.

**Content is not fetched or pinned automatically.** A fresh node is empty; what it holds is what you add or pin through the admin portal.

## Actions

| Action                                       | Id               | What it does                                                                                                                                                                                                            |
| -------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create Admin Password / Reset Admin Password | `reset-password` | Generates a 32-character alphanumeric password, stores it in `store.json` (setting `passwordSet`), and returns username `admin` and the masked password. The daemon restarts so `API.Authorizations` takes the new one. |

Everything else is done from the admin portal.

## Tasks

One, **important**: run **Create Admin Password**, raised by init whenever `passwordSet` is not true (fresh install, an update from a version without the password, or a restore). It does not block the service from starting.

## Health Checks

One check, on the only daemon.

| Check     | Displayed as    | Method                 |
| --------- | --------------- | ---------------------- |
| `primary` | "Web Interface" | Port 5001 is listening |

It reports that the admin API is answering. It says nothing about the gateway, about peer connectivity, or about whether the node is reachable from the wider network — a node with no peers is green here.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. That is the node's identity **and everything it has pinned**.

Two consequences:

- **The backup grows with what you pin.** A node holding a large pinset produces a large backup, every time, because there is no incremental path.
- **The node identity is in it**, so a restored node keeps its peer id and the addresses others use to reach it. Losing the backup means a new identity.

Content that was merely cached rather than pinned is not worth preserving and comes back on demand; the pinset is the part that matters.

`store.json` is on the `startos` volume, which is not backed up, so a restored node gets a fresh unseen password and the **Create Admin Password** task again.

## Limitations and Differences

1. **The Web UI does not prompt for the password.** It has to be given the API address with the credential (`https://admin:<password>@<host>`) once per browser.
2. **One action only**, for the admin password; everything else is configured from the admin portal.
3. **Several Kubo settings are re-derived on every start** — API origins, the API authorization, bind addresses, the public gateway table, and the relay settings — so hand edits to those do not survive.
4. **The backup includes the entire pinset**, so its size tracks your storage.
5. **An address change needs a restart** before the gateway advertises it.
6. **Content is never fetched automatically.** A fresh node is empty.

---

## Quick Reference for AI Consumers

```yaml
package_id: ipfs
image: ipfs/kubo
architectures:
  - x86_64
  - aarch64
subcontainers:
  - ipfs-sub # two oneshots and the daemon
volumes:
  main: /data/ipfs # identity, config, and pinned blocks
  startos: not mounted # package state
file_models:
  - store.json # admin password; Kubo's own config is rewritten via its CLI, not modelled
startos_managed_env_vars: []
dependencies: []
interfaces:
  rpc: { type: ui, port: 5001, path: /webui } # /api/v0 requires basic auth admin:<password>
  gateway: { type: ui, port: 8080, path: /ipfs }
  swarm: { type: p2p, port: 4001 }
actions:
  - reset-password # Create / Reset Admin Password
tasks:
  - reset-password # important, until the owner creates the password
health_checks:
  - primary # displayed "Web Interface"; probes the admin API only
```
