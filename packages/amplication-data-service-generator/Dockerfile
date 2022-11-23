FROM node:16.16 AS base
# RUN apk add g++ make python3

WORKDIR /workspace/packages/amplication-code-gen-types
COPY ./dist/packages/amplication-code-gen-types/package.json .
RUN npm i --omit-dev
COPY ./dist/packages/amplication-code-gen-types .

WORKDIR /workspace/packages/amplication-data-service-generator
COPY ./dist/packages/amplication-data-service-generator/package.json .
RUN npm i --omit-dev
COPY ./dist/packages/amplication-data-service-generator .

RUN mkdir /.amplication
RUN mkdir /.amplication/transfer
RUN mkdir /.amplication/build-input
RUN mkdir /.amplication/build-output
RUN mkdir /.amplication/injected-plugins