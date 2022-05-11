#!/bin/bash
environment=$1
if [ $environment = 'development' ]; then 
    cd ../../ && grep -v '^#' .env.dev && export $(grep -v '^#' .env.dev | xargs)
fi