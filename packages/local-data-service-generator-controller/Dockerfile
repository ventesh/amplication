FROM node:18.12.1-slim AS base

# Required to run Prisma on ARM64 machines
# https://github.com/prisma/prisma/issues/861#issuecomment-881992292
RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY ./dist/packages/local-data-service-generator-controller/package*.json ./

RUN npm i

COPY ./dist/packages/local-data-service-generator-controller .


ENV PORT=8900
EXPOSE $PORT

ENTRYPOINT ["node", "./main.js"]
