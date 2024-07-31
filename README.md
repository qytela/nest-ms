# Example NestJS Microservices (Monorepo) + Kafka

![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)

![Unit Test](https://github.com/qytela/nest-ms/actions/workflows/unit-test.yaml/badge.svg)

---

## About this project

This project show how to build NestJS (monorepo [nx.dev](https://nx.dev/)) microservices with Kafka transport.

The services is:

- Api Gateway
- Auth Service
- Movie & Category Service
- Log Service

## Requirements

- docker
- docker compose
- node > 16.x

## Installation

1. clone this git repository.
2. run `npm install`.
3. in root project, run the `docker-compose.yml` file:

```sh
docker-compose up -d
```

4. Run services:

```sh
nx serve api-gateway
nx serve auth-service
nx serve movie-service
nx serve log-service
```

## Test

Testing services:

```sh
./nx-test.sh
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

  Register: /auth/register

  ```json
  {
    "username": "qytela",
    "password": "123123"
  }
  ```

  Me: /auth/me

- Movie Service:

  Movies: /movie

  Categories: /movie/category

---

## K8s

[Kubernetes Deployment](https://github.com/qytela/nest-ms/tree/main/k8s)

[Prometheus & Grafana Deployment](https://github.com/qytela/nest-ms/blob/main/k8s/PROMETHEUS.md)
