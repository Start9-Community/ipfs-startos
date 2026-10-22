ARG IMAGE
FROM alpine:3.23 AS ca
RUN apk upgrade --no-cache ca-certificates-bundle \
 && if [ -f /etc/ssl/certs/ca-certificates.crt.apk-new ]; then mv /etc/ssl/certs/ca-certificates.crt.apk-new /etc/ssl/certs/ca-certificates.crt; fi \
 && ! grep -q MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr /etc/ssl/certs/ca-certificates.crt

FROM ${IMAGE}
# Go also loads every file under /etc/ssl/certs, so the image's whole directory is replaced.
RUN rm -rf /etc/ssl/certs && mkdir -p /etc/ssl/certs
COPY --from=ca /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
RUN ! grep -rqs MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr /etc/ssl/certs
