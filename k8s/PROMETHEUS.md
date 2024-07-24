# Monitoring Services with Prometheus and Grafana

This is show how to monitoring your apps with Prometheus and Grafana.

# Installation

1. Create the namespace.

```sh
kubectl create namespace prometheus
```

2. Install kube-prometheus-stack using helm.

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack -n prometheus -f k8s/prometheus/prometheus.yaml
```

> if you don't know how to get the values.yaml run this command below:

```sh
sudo apt-get install xclip

helm show values prometheus-community/kube-prometheus-stack | xclip -selection clipboard
```

3. Wait for installation complete (process may takes up to 5-10 minutes).

4. After installation complete, expose the Prometheus and Grafana.

```sh
./k8s/run-prometheus.sh
./k8s/run-grafana.sh
```

---

Dashboard Grafana:

- username: admin
- password: prom-operator

> import k8s/prometheus/NestJSApps.json to Grafana Dashboard.

# Useful Query

- See active total pods.

```sh
sum(min_over_time(sum(group(kube_pod_container_status_ready{namespace="<namespace>",pod=~"<service-name>-.*"}) by (pod,uid)) [5m:1m]) OR on() vector(0))
```

- See Pods Memory Usage (MB)

```sh
sum by (pod) (container_memory_usage_bytes{namespace="default"}) / (1024 * 1024)
```

- See Pods CPU Usage (Mi)

```sh
sum by (pod) (rate(container_cpu_usage_seconds_total{namespace="default"}[5m])) * 1000
```

[![Screenshot-277.png](https://i.postimg.cc/Vsqm6Cry/Screenshot-277.png)](https://postimg.cc/6TpDbTfz)
[![Screenshot-276.png](https://i.postimg.cc/tJc6PjLm/Screenshot-276.png)](https://postimg.cc/jnzC0Gqz)
[![Screenshot-278.png](https://i.postimg.cc/8Czb039p/Screenshot-278.png)](https://postimg.cc/w1nJtW9Z)
