#!/bin/bash

# start all the needed microservices

SERVICES_DIR="services"

EMPLOYEE_MICROSERVICE="./${SERVICES_DIR}/employee-microservice"
FIXTURE_MICROSERVICE="./${SERVICES_DIR}/fixture-microservice"
GROUPS_TEAMS_MICROSERVICE="./${SERVICES_DIR}/groups-teams-microservice"

install_deps()
{
    if [ ! -d "${EMPLOYEE_MICROSERVICE}/node_modules" ]; then
        cd "${EMPLOYEE_MICROSERVICE}" && npm install
        
    fi

    if [ ! -d "${FIXTURE_MICROSERVICE}/node_modules" ]; then
        cd "${FIXTURE_MICROSERVICE}" && npm install
    fi

    if [ ! -d "${GROUPS_TEAMS_MICROSERVICE}/node_modules" ]; then
        cd "${GROUPS_TEAMS_MICROSERVICE}" && npm install
    fi
}

start()
{
    node "${EMPLOYEE_MICROSERVICE}/bin/www" &
    sleep 1
    echo $! > "${EMPLOYEE_MICROSERVICE}/.pid"

    node "${FIXTURE_MICROSERVICE}/bin/www" &
    sleep 1
    echo $! > "${FIXTURE_MICROSERVICE}/.pid" 
    
    node "${GROUPS_TEAMS_MICROSERVICE}/bin/www" &
    sleep 1
    echo $! > "${GROUPS_TEAMS_MICROSERVICE}/.pid"
}


install_deps
start