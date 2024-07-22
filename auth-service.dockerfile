# Build the docker image with `docker build -f auth-service.dockerfile . -t qytela/auth-service:dev-0.1`.
FROM node:16.20.2 AS builder

ENV HOST=0.0.0.0

WORKDIR /app
RUN npm install -g nx
COPY package*.json .
COPY nx.json .
RUN npm install
COPY . .
RUN nx reset
RUN nx build auth-service

FROM node:16.20.2
WORKDIR /app
COPY --from=builder /app/dist/apps/auth-service .
COPY package*.json .
RUN npm install --omit=dev
CMD ["node", "./main.js"]
