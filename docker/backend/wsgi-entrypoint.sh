#!/bin/sh

# Wait till server is ready
until cd /code/backend/server
do
    echo "Waiting for server volume..."
done

# Wait till DB is ready
until ./manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

# Run DB migration and collect static files
./manage.py collectstatic --noinput
# Apply all migrations
./manage.py makemigrations
./manage.py migrate

# Run all test cases
./manage.py test

# Run gunicorn server with 4 workers and threads (16 concurrent request)
gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4 --log-level debug

