#!/bin/sh

set -e

role=${CONTAINER_ROLE:-app}
env=${APP_ENV:-production}
port=${PORT:-8000}

if [ "$env" != "local" ]; then
    echo "Caching configuration..."
    (cd /app && php artisan config:cache && php artisan route:cache && php artisan view:cache)
fi

if [ "$role" = "app" ]; then

    (cd /app && php artisan serv --host=0.0.0.0 --port=$port)

elif [ "$role" = "queue" ]; then

    echo "Running the queue..."
    php /app/artisan queue:work --verbose --tries=3 --timeout=90

elif [ "$role" = "scheduler" ]; then

    while [ true ]
    do
      php /app/artisan schedule:run --verbose --no-interaction &
      sleep 60
    done

else
    echo "Could not match the container role \"$role\""
    exit 1
fi
