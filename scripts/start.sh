#!/bin/bash

# start all the needed microservices

SERVICES_DIR="."

API_GATEWAY="${SERVICES_DIR}/api-gateway"
MICROSERVICE="${SERVICES_DIR}/microservice"

install_deps()
{   

    if [ ! -d "${API_GATEWAY}/node_modules" ]; then
        cd "${API_GATEWAY}" && npm install ; cd -
    fi

    if [ ! -d "${MICROSERVICE}/node_modules" ]; then
        cd "${MICROSERVICE}" && npm install ; cd -
    fi
}

start()
{
    node "${API_GATEWAY}/bin/www" &> out.log &
    sleep 1
    echo $! > "${API_GATEWAY}/.pid"

    node "${MICROSERVICE}/build/server.js" &> out.log &
    sleep 1
    echo $! > "${MICROSERVICE}/.pid"
}


install_deps
start