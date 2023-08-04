#!/bin/bash

while ! nc -z -v -w30 db-service 5432; do
  echo "Waiting for the database to be available..."
  sleep 2
done

# Apply database migrations
echo "Apply database migrations"
python manage.py makemigrations
python manage.py migrate

sleep 2
python manage.py runserver 0.0.0.0:8000
