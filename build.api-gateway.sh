docker build -f api-gateway.dockerfile . -t qytela/api-gateway:dev-0.1 && \
docker save -o api-gateway.tar qytela/api-gateway:dev-0.1 && \
minikube image load api-gateway.tar && \
rm -rf api-gateway.tar && \
kubectl rollout restart -n default deployment api-gateway
