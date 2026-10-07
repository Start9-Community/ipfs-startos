# IPFS

## Documentation

- [IPFS documentation](https://docs.ipfs.tech/) — the upstream documentation covering IPFS concepts, the Kubo node, the HTTP RPC API, and the gateway specification.

## What you get on StartOS

- An **Admin Portal (private)** — the Kubo Web UI for managing your node: peers, pins, files (MFS), and configuration.
- A **Public Gateway** — an HTTP gateway that serves content from the IPFS network at `/ipfs/` and `/ipns/`, with subdomain gateways enabled for any StartOS hostname you expose it on.
- A **Swarm P2P** interface — your node's libp2p endpoint for peering with the rest of the IPFS network. Relay client and relay transport are enabled by default so the node can still reach peers from behind NAT.
- StartOS keeps the node's CORS headers, API and Gateway listen addresses, and the subdomain-gateway list in sync with your hostnames on every start, so the Web UI and gateway work over LAN, `.local`, Tor, and any custom domain you add.

## Getting set up

If you carried IPFS over from StartOS 0.3.5, this update removes the old **API / Web UI** and **IPFS Gateway** addresses. Their Tor addresses are not transferred. Add replacement addresses to **Admin Portal (private)** and **Public Gateway** if you need them.

1. Start the service and wait for the **Web Interface** health check to go green.
2. Open the **Admin Portal (private)** interface. The Web UI loads at `/webui` and is immediately usable — there is no first-run wizard or login.
3. Open the **Public Gateway** interface to confirm content retrieval works (visit `/ipfs/<cid>` for any CID).

## Using IPFS

### Admin Portal (private)

Use the Web UI to view your node's status and peers, browse and pin files, edit MFS, and adjust configuration. The RPC API is exposed at the same origin under `/api/v0/` for tools and SDKs that talk to a Kubo node.

### Public Gateway

Share IPFS content by giving people a URL on your gateway: `https://<gateway-host>/ipfs/<cid>` or `https://<gateway-host>/ipns/<name>`. Subdomain gateways are configured for each StartOS hostname, so CIDs requested with subdomain-style URLs resolve correctly.

### Swarm P2P

The Swarm interface is the address other IPFS nodes use to connect to yours. You normally won't open it in a browser — it's listed so you can see the node's peer addresses and confirm reachability.
