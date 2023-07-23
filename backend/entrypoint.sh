#!/bin/bash

while ! nc -z -v -w30 db 5432; do
  echo "Waiting for the database to be available..."
  sleep 2
done

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

sleep 2
python manage.py collectstatic --no-input

sleep 2
# Start server
echo "Starting server"
