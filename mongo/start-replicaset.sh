#!/bin/bash
# chmod +x start-replicaset.sh
# ./start-replicaset.sh

# create key file
echo "⚡️ creating key file..."
if [ ! -f ${PWD}/mongo/rs_key_file ]; then
    openssl rand -base64 756 > ${PWD}/mongo/rs_key_file
    chmod 0400 ${PWD}/mongo/rs_key_file
    # chown 999:999 ${PWD}/mongo/rs_key_file 
fi

# spawn 3 containers
echo "⚡️ spawning 3 containers..."
docker-compose -f mongo/mongo-cluster.yml up -d

# wait for the MongoDB containers to be fully up and running
sleep 10

# initialize the replica set
echo "⚡️ initializing the replica set..."
docker exec -it mongo1 mongosh -u root -p root --eval 'rs.initiate({
 _id: "my-rs",
 members: [
   {_id: 0, host: "mongo1:27017"},
   {_id: 1, host: "mongo2:27018"},
   {_id: 2, host: "mongo3:27019"}
 ]
})'

# check the status of the replica set
echo "⚡️ checking the status of the replica set..."
docker exec -it mongo1 mongosh -u root -p root --eval 'rs.status()'
