FROM node:16.16-slim AS base

# Required to run Prisma on ARM64 machines
# https://github.com/prisma/prisma/issues/861#issuecomment-881992292
RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY ./dist/packages/amplication-server/package.json .
COPY ./packages/amplication-server/.env* .
COPY ./packages/amplication-prisma-db/prisma/schema.prisma .
COPY ./packages/amplication-prisma-db/prisma/generated/prisma-client/libquery_engine-darwin-arm64.dylib.node .

RUN npm i --omit=dev

COPY ./dist/packages/amplication-server .

# This is required to include the Prisma client in the image
COPY ./node_modules/@amplication/prisma-clients/amplication-prisma-db ./node_modules/@amplication/prisma-clients/amplication-prisma-db


ENV PORT=3333
EXPOSE $PORT

ENTRYPOINT ["node", "./main.js"]