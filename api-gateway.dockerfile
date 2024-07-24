# Build the docker image with `docker build -f api-gateway.dockerfile . -t qytela/api-gateway:dev-0.1`.
FROM node:16.20.2 AS builder

ENV HOST=0.0.0.0
ENV PORT=8080

WORKDIR /app
RUN npm install -g nx
COPY package*.json .
COPY nx.json .
RUN npm install
COPY . .
RUN nx reset
RUN nx build api-gateway

FROM node:16.20.2
WORKDIR /app
COPY --from=builder /app/dist/apps/api-gateway .
COPY package*.json .
RUN npm install --omit=dev
EXPOSE ${PORT}
CMD ["node", "./main.js"]
