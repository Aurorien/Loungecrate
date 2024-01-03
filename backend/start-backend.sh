#!/bin/bash

wait_for_postgres() {
    echo "Checking if PostgreSQL is ready..."
    while ! nc -z database 5432; do
        sleep 1
        echo "Waiting for PostgreSQL to be ready..."
    done
    echo "PostgreSQL is ready."
}

wait_for_postgres

echo "Waiting a bit longer for the database to fully initialize..."
sleep 10

node index.js
