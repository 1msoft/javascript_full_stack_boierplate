#!/bin/sh

set -e

NODE=/usr/local/bin/node
NETCAT=/bin/nc
export DOCKER_HOST_IP=$(ip route  | head -n1 | awk '{print $3}')

# if no env setting, set each port to default port and each service ip to docker host ip

# DATABASE
if [ -z "$DATABASE_PORT" ]; then
  export DATABASE_PORT=3306
  echo "export DATABASE_PORT=$DATABASE_PORT" >> /root/.bashrc
fi

if  [ -z "$DATABASE_HOST" ]; then
  export DATABASE_HOST=$DOCKER_HOST_IP
  echo "export DATABASE_HOST=$DATABASE_HOST"  >> /root/.bashrc
fi

#MONGO
if [ -z "$MONGO_PORT" ]; then
  export MONGO_PORT=27017
  echo "export MONGO_PORT=$MONGO_PORT" >> /root/.bashrc
fi

if [ -z "$MONGO_HOST" ]; then
  export MONGO_HOST=$DOCKER_HOST_IP
  echo "export MONGO_HOST=$MONGO_HOST"  >> /root/.bashrc
fi

#REDIS
if [ -z  "$REDIS_PORT" ]; then
  export REDIS_PORT=6379
  echo "export REDIS_PORT=$REDIS_PORT" >> /root/.bashrc
fi

if [ -z "$REDIS_HOST" ]; then
  export REDIS_HOST=$DOCKER_HOST_IP
  echo "export REDIS_HOST=$REDIS_HOST"  >> /root/.bashrc
fi

# wait for database
echo -n "waiting for mongo $MONGO_HOST:$MONGO_PORT..."

while ! $NETCAT -w 1 -z $MONGO_HOST $MONGO_PORT >/dev/null 2>&1
do
  echo -n .
  sleep 1
done
# wait mongo
echo -n "waiting for mysql $DATABASE_HOST:$DATABASE_PORT..."
while ! $NETCAT -w 1 -z $DATABASE_HOST $DATABASE_PORT >/dev/null 2>&1
do
  echo -n .
  sleep 1
done

# run all .sh && .py in init.d
# this folder mount from volume map
echo -n "waiting for system initialize..."

for f in /var/webapps/init.d/*; do
  case "$f" in
    *.sh)  echo "$0: running $f"; . "$f" || true;;
    *.js) echo "$0: running $f"; $NODE $f || true;;
    *)     echo "$0: ignoring $f" ;;
  esac
  echo
done


# run command
exec "$@"