#!/bin/bash

# stop all the needed microservices

SERVICES_DIR="."

API_GATEWAY="${SERVICES_DIR}/api-gateway"
MICROSERVICE="${SERVICES_DIR}/microservice"

kill $(cat ${MICROSERVICE}/.pid)
rm ${MICROSERVICE}/.pid

kill $(cat ${API_GATEWAY}/.pid)
rm ${API_GATEWAY}/.pid