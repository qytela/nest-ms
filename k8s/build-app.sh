docker build -f $1.dockerfile . -t qytela/$1:dev-0.1 && \
docker save -o $1.tar qytela/$1:dev-0.1 && \
minikube image load $1.tar && \
rm -rf $1.tar && \
kubectl rollout restart -n default deployment $1
