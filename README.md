# Example NestJS Microservices (Monorepo) + Kafka

## About this project

This project show how to build microservices with Kafka transport.

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

4. Execute `./run-apps.sh`.

## Endpoints

- Api Gateway: http://localhost:3000/api
- Auth Service:

  Login: /auth/login

- Movie Service:

  Categories: /movie/category
