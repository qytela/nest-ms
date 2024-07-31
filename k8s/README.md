# Kubernetes Installation with Minikube

## Requirements

Verify minikube installation:

```sh
minikube version

// output
minikube version: v1.32.0
commit: 8220a6eb95f0a4d75f7f2d7b14cef975f050512d
```

## Installation

### Before Begin

1. Start minikube with 3 node(s).

```sh
minikube start --nodes 3 --base-image gcr.io/k8s-minikube/kicbase-builds:v0.0.42-1703092832-17830
```

2. Set node(s) to worker.

```sh
./k8s/set-workers.sh
```

3. Build docker image on minikube instance for each apps.

```sh
minikube image build -f api-gateway.dockerfile . -t {username}/api-gateway:dev-0.1

minikube image build -f auth-service.dockerfile . -t {username}/auth-service:dev-0.1

minikube image build -f movie-service.dockerfile . -t {username}/movie-service:dev-0.1

minikube image build -f log-service.dockerfile . -t {username}/log-service:dev-0.1
```

4. Change the {username} with your docker username and inside `k8s/apps/{app}/deployment.yaml` too.

### Kafka Installation

1. Create kafka namespace.

```sh
kubectl create namespace kafka
```

2. Install kafka using helm.

```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install kafka bitnami/kafka -n kafka -f k8s/kafka/kafka.yaml
```

> process may takes up 5-10 minutes to complete kafka cluster.

### Service Deployment

1. Get `KAFKA_PASSWORD` and modify the ConfigMap inside `k8s/apps/configmap.yaml` and apply.

```
// get kafka password
kubectl get secret kafka-user-passwords --namespace kafka -o jsonpath='{.data.client-passwords}' | base64 -d | cut -d , -f 1
```

Apply ConfigMap:

```sh
kubectl apply -f k8s/apps/configmap.yaml
```

Also configure ConfigMap inside `k8s/kafka/redpanda.yaml` replace `KAFKA_SASL_PASSWORD`.

```sh
kubectl apply -f k8s/kafka/redpanda.yaml

// to open kafka dashboard
./k8s/run-redpandaconsole.sh
```

2. Apply each file \*.yaml inside `k8s/apps/{app}/deployment|service.yaml`, example:

```sh
kubectl apply -f k8s/apps/api-gateway/deployment.yaml
kubectl apply -f k8s/apps/api-gateway/service.yaml
```

3. Open minikube dashboard.

```sh
minikube dashboard
```

4. Open new terminal tab and forward api-gateway service.

```sh
./k8s/run-gateway.sh
```

## Flowchart

![Microservices-Logic](images/Microservices%20Logic.jpg)
