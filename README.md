<p align="center">
  <img src="icon.svg" alt="IPFS Logo" width="21%">
</p>

# IPFS on StartOS

> **Upstream docs:** <https://docs.ipfs.tech/>
>
> Everything not listed in this document should behave the same as upstream
> Kubo. If a feature, setting, or behavior is not mentioned
> here, the upstream documentation is accurate and fully applicable.

[IPFS](https://github.com/ipfs/kubo) (InterPlanetary File System) is a peer-to-peer hypermedia protocol designed to make the web faster, safer, and more open. Kubo is the reference implementation of IPFS.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `ipfs/kubo` (upstream unmodified) |
| Architectures | x86_64, aarch64 |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/data/ipfs` | IPFS repository (config, datastore, blocks) |
| `startos` | — | Reserved for StartOS state |

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Installation | Download binary or Docker | Install from marketplace |
| Configuration | `ipfs init` + manual config | Auto-configured on startup |
| Access | CLI or localhost web UI | Web UI via StartOS interfaces |

**First-run steps:**

1. Install IPFS from StartOS marketplace
2. Access the Admin Portal (Web UI) to manage your node
3. Use the Public Gateway to access IPFS content
4. Your node automatically joins the P2P network via Swarm

---

## Configuration Management

### Auto-Configured Settings

StartOS automatically configures the following on each startup:

| Setting | Value | Purpose |
|---------|-------|---------|
| `API.HTTPHeaders.Access-Control-Allow-Origin` | StartOS URLs | CORS for web UI access |
| `API.HTTPHeaders.Access-Control-Allow-Methods` | `["PUT","POST"]` | CORS methods |
| `Addresses.API` | `/ip4/0.0.0.0/tcp/5001` | API listening address |
| `Addresses.Gateway` | `/ip4/0.0.0.0/tcp/8080` | Gateway listening address |
| `Gateway.PublicGateways` | StartOS hostnames | Subdomain gateway support |
| `Swarm.RelayClient.Enabled` | `true` | Enable relay client |
| `Swarm.Transports.Network.Relay` | `true` | Enable relay transport |

### Configuration NOT Exposed on StartOS

All other IPFS configuration can be modified via:

- The Web UI settings panel
- The `ipfs config` command (via container exec)

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Admin Portal | 5001 | HTTP | Web UI and RPC API (`/webui`) |
| Public Gateway | 8080 | HTTP | Content gateway (`/ipfs`, `/ipns`) |
| Swarm P2P | 4001 | TCP | Peer-to-peer network |

**Access methods (StartOS 0.4.0):**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

**Swarm connectivity:** Port 4001 is exposed for P2P connections. Relay client is enabled for NAT traversal.

---

## Actions (StartOS UI)

None. IPFS is configured automatically and managed via the Web UI.

---

## Dependencies

None. IPFS is a standalone application.

---

## Backups and Restore

**Included in backup:**

- `main` volume — IPFS repository (config, keys, pinned content, datastore)

**Restore behavior:**

- Node identity (peer ID) preserved
- Pinned content restored
- Configuration restored

---

## Health Checks

| Check | Display Name | Method |
|-------|--------------|--------|
| Web Interface | Web Interface | Port 5001 listening |

**Messages:**

- Success: "The web interface is ready"
- Error: "The web interface is not ready"

---

## Limitations and Differences

1. **No CLI access by default** — Use Web UI or container exec for CLI commands
2. **Auto-configured networking** — CORS and gateway settings managed by StartOS
3. **No authentication** — Admin portal is not password-protected (access controlled by StartOS)

---

## What Is Unchanged from Upstream

- Full IPFS node functionality
- P2P network participation (DHT)
- Content pinning and retrieval
- IPNS name publishing
- Web UI for node management
- HTTP Gateway for content access
- RPC API (`/api/v0`)
- Relay client for NAT traversal
- All `ipfs` CLI commands (via container exec)
- Garbage collection
- Bandwidth management
- Peer management

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: ipfs
image: ipfs/kubo
architectures: [x86_64, aarch64]
volumes:
  main: /data/ipfs
  startos: (reserved)
ports:
  rpc: 5001
  gateway: 8080
  swarm: 4001
dependencies: none
actions: none
auto_config:
  - API.HTTPHeaders (CORS)
  - Addresses.API (0.0.0.0:5001)
  - Addresses.Gateway (0.0.0.0:8080)
  - Gateway.PublicGateways (subdomain support)
  - Swarm.RelayClient.Enabled (true)
  - Swarm.Transports.Network.Relay (true)
health_checks:
  - port_listening: 5001
backup_volumes:
  - main
interfaces:
  - rpc: Admin Portal (Web UI at /webui)
  - gateway: Public Gateway (/ipfs, /ipns)
  - swarm: P2P network (port 4001)
```
