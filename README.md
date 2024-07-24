# Example NestJS Microservices (Monorepo) + Kafka

## About this project

This project show how to build NestJS (monorepo [nx.dev](https://nx.dev/)) microservices with Kafka transport.

The services is:

- Api Gateway
- Auth Service
- Movie (Category) Service
- Log Service

## Requirements

- docker
- docker compose
- node > 16.x
- gnome-terminal (optional)

## Installation

1. clone this git repository.
2. run `npm install`.
3. in root project, run the `docker-compose.yml` file:

```sh
docker-compose up -d
```

4. Rebuild services `./run-apps.sh`.

## Test e2e

Testing e2e api-gateway:

```sh
nx e2e api-gateway-e2e
```

## Endpoints

- Api Gateway: http://localhost:8080/api
- Auth Service:

  Login: /auth/login

  ```json
  {
    "username": "qytela",
    "password": "123123"
  }
  ```

- Movie Service:

  Categories: /movie/category
