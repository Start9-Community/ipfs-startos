# IPFS

## Documentation

- [IPFS documentation](https://docs.ipfs.tech/) — the upstream documentation covering IPFS concepts, the Kubo node, the HTTP RPC API, and the gateway specification.

## What you get on StartOS

- An **Admin Portal (private)** — the Kubo Web UI for managing your node: peers, pins, files (MFS), and configuration. It and the Kubo RPC API behind it are protected by an admin password.
- A **Public Gateway** — an HTTP gateway that serves content from the IPFS network at `/ipfs/` and `/ipns/`, with subdomain gateways enabled for any StartOS hostname you expose it on.
- A **Swarm P2P** interface — your node's libp2p endpoint for peering with the rest of the IPFS network. Relay client and relay transport are enabled by default so the node can still reach peers from behind NAT.
- StartOS keeps the node's CORS headers, API and Gateway listen addresses, and the subdomain-gateway list in sync with your hostnames on every start, so the Web UI and gateway work over LAN, `.local`, Tor, and any custom domain you add.

## Getting set up

If you carried IPFS over from StartOS 0.3.5, this update removes the old **API / Web UI** and **IPFS Gateway** addresses. Their Tor addresses are not transferred. Add replacement addresses to **Admin Portal (private)** and **Public Gateway** if you need them.

1. Run the **Create Admin Password** task (the action of the same name). It shows the username, `admin`, and a generated password; save the password to a password manager.
2. Start the service and wait for the **Web Interface** health check to go green.
3. Open the **Admin Portal (private)** interface. The Web UI loads at `/webui` and shows "Could not connect to the Kubo RPC", with a **Kubo RPC API address** field. Enter `https://admin:<password>@<host>`, where `<host>` is the hostname, with its port if it has one, of the address you opened the portal at, and submit. The Web UI remembers it in this browser; do the same once in each browser you use.
4. Open the **Public Gateway** interface to confirm content retrieval works (visit `/ipfs/<cid>` for any CID).

To change the password, run **Reset Admin Password**. IPFS restarts with the new one, and each browser and tool needs the new credentials: in the Web UI, enter the new address under **Settings** → **Kubo RPC API address**.

## Using IPFS

### Admin Portal (private)

Use the Web UI to view your node's status and peers, browse and pin files, edit MFS, and adjust configuration. The RPC API is exposed at the same origin under `/api/v0/` for tools and SDKs that talk to a Kubo node; they must send the admin credentials as HTTP Basic auth (for the `ipfs` CLI, `--api-auth basic:admin:<password>`).

### Public Gateway

Share IPFS content by giving people a URL on your gateway: `https://<gateway-host>/ipfs/<cid>` or `https://<gateway-host>/ipns/<name>`. Subdomain gateways are configured for each StartOS hostname, so CIDs requested with subdomain-style URLs resolve correctly.

### Swarm P2P

The Swarm interface is the address other IPFS nodes use to connect to yours. You normally won't open it in a browser — it's listed so you can see the node's peer addresses and confirm reachability.

If you publish the **Swarm** interface through StartTunnel to keep your home IP private, send IPFS's outbound traffic through that tunnel too. Connections IPFS opens itself to other IPFS nodes otherwise leave through your home router, so those peers see your home IP. If you use the tunnel for another reason, such as a port your router can't forward, there is nothing to change.
