FROM golang:1.25-bookworm AS builder

# Install deps
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fuse

ENV SRC_DIR /kubo

# Download packages first so they can be cached.
COPY go-ipfs/go.mod go-ipfs/go.sum $SRC_DIR/
RUN cd $SRC_DIR \
  && go mod download

COPY ./go-ipfs $SRC_DIR

# Preload an in-tree but disabled-by-default plugin by adding it to the IPFS_PLUGINS variable
# e.g. docker build --build-arg IPFS_PLUGINS="foo bar baz"
ARG IPFS_PLUGINS

# Build the thing.
# Also: fix getting HEAD commit hash via git rev-parse.
RUN cd $SRC_DIR \
  && mkdir -p .git/objects \
  && GOFLAGS=-buildvcs=false make build IPFS_PLUGINS=$IPFS_PLUGINS

# Extract required runtime tools from Debian
FROM debian:bookworm-slim AS utilities
RUN set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    tini \
    gosu \
    fuse \
    ca-certificates \
  ; \
  apt-get clean; \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Now comes the actual target image, which aims to be as small as possible.
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends curl wget && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Get the ipfs binary, entrypoint script, and TLS CAs from the build container.
ENV SRC_DIR /kubo
COPY --from=builder $SRC_DIR/cmd/ipfs/ipfs /usr/local/bin/ipfs
COPY --from=builder $SRC_DIR/bin/container_daemon /usr/local/bin/start_ipfs
COPY --from=utilities /usr/sbin/gosu /sbin/gosu
COPY --from=utilities /usr/bin/tini /sbin/tini
COPY --from=utilities /bin/fusermount /usr/local/bin/fusermount
COPY --from=utilities /etc/ssl/certs /etc/ssl/certs

# Add suid bit on fusermount so it will run properly
RUN chmod 4755 /usr/local/bin/fusermount

# Fix permissions on start_ipfs (ignore the build machine's permissions)
RUN chmod 0755 /usr/local/bin/start_ipfs

# Swarm TCP; should be exposed to the public
EXPOSE 4001
# Swarm UDP; should be exposed to the public
EXPOSE 4001/udp
# Daemon API; must not be exposed publicly but to client services under you control
EXPOSE 5001
# Web Gateway; can be exposed publicly with a proxy, e.g. as https://ipfs.example.org
EXPOSE 8080
# Swarm Websockets; must be exposed publicly when the node is listening using the websocket transport (/ipX/.../tcp/8081/ws).
EXPOSE 8081

# Create the fs-repo directory and switch to a non-privileged user.
ENV IPFS_PATH /data/ipfs
RUN mkdir -p $IPFS_PATH \
  # && adduser -D -h $IPFS_PATH -u 1000 -G users ipfs \
  && adduser --system --disabled-password --home $IPFS_PATH --uid 1000 --ingroup users ipfs \
  && chown ipfs:users $IPFS_PATH

# Create mount points for `ipfs mount` command
RUN mkdir /ipfs /ipns \
  && chown ipfs:users /ipfs /ipns

ARG PLATFORM
RUN wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_${PLATFORM} && chmod +x /usr/local/bin/yq

# Expose the fs-repo as a volume.
# start_ipfs initializes an fs-repo if none is mounted.
# Important this happens after the USER directive so permissions are correct.
VOLUME $IPFS_PATH

# The default logging level
ENV GOLOG_LOG_LEVEL ""

ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ADD check-web.sh /usr/local/bin/check-web.sh
RUN chmod +x /usr/local/bin/*.sh

# This just makes sure that:
# 1. There's an fs-repo, and initializes one if there isn't.
# 2. The API and Gateway are accessible from outside the container.
ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/start_ipfs"]

# Heathcheck for the container
# QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn is the CID of empty folder
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ipfs dag stat /ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn || exit 1 

# Execute the daemon subcommand by default
CMD ["daemon", "--migrate=true", "--agent-version-suffix=docker"]
