#!/bin/bash

# stop all the needed microservices

SERVICES_DIR="services"

EMPLOYEE_MICROSERVICE="./${SERVICES_DIR}/employee-microservice"
FIXTURE_MICROSERVICE="./${SERVICES_DIR}/fixture-microservice"
GROUPS_TEAMS_MICROSERVICE="./${SERVICES_DIR}/groups-teams-microservice"

kill $(cat ${EMPLOYEE_MICROSERVICE}/.pid)
rm ${EMPLOYEE_MICROSERVICE}/.pid

kill $(cat ${FIXTURE_MICROSERVICE}/.pid)
rm ${FIXTURE_MICROSERVICE}/.pid

kill $(cat ${GROUPS_TEAMS_MICROSERVICE}/.pid)
rm ${GROUPS_TEAMS_MICROSERVICE}/.pid