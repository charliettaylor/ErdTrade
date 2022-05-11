#!/bin/bash -e

# VARS
environment=$1
path=./config/

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

echo $(docker-compose  --env-file config/.env.dev -f docker-compose.yml up --build --remove-orphans)

function cleanup {
    docker compose -f 'docker-compose.yml' --env-file 'config/.env.dev' -p 'erdtrade' down --remove-orphans
}

if [ $? -eq 2 ]; then cleanup fi