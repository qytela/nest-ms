kubectl get rs -A -o wide | tail -n +2 | awk '{if ($3 + $4 + $5 == 0) print "kubectl delete rs -n "$1, $2 }' | sh
