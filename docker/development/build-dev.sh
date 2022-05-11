#!/bin/bash -e

# VARS
environment=$1
path=./docker/configs/

if [[ $environment == "production" ]];
then
    env_path="$path.env.prod"
elif [[ $environment == "development" ]];
then
    env_path="$path.env.dev"
else
    echo "$(tput setaf 1)[ERROR]: $(tput setaf 7)Invalid environment arg $1"
    exit 1
fi

echo $(docker-compose --env-file docker/configs/.env.dev -f docker-compose.dev.yml up --build)

function cleanup {
    docker compose -f 'docker-compose.dev.yml' --env-file 'docker/configs/.env.dev' -p 'erdtrade' down
}

if [ $? -eq 2 ]; then cleanup fi