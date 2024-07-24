kubectl label node minikube-m02 node-role.kubernetes.io/worker=worker && \
kubectl label node minikube-m03 node-role.kubernetes.io/worker=worker && \
kubectl label nodes minikube-m02 role=worker && \
kubectl label nodes minikube-m03 role=worker
