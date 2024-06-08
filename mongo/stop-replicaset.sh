#!/bin/bash
# chmod +x stop-replicaset.sh
# ./stop-replicaset.sh

# spawn 3 containers
echo "⚡️ stopping 3 containers..."
docker-compose -f mongo/mongo-cluster.yml down