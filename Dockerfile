FROM php:8.2-alpine

COPY --from=node:18.16.1-alpine /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node:18.16.1-alpine /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# packages
RUN docker-php-ext-install mysqli pdo_mysql
# memcached
ENV MEMCACHED_DEPS zlib-dev libmemcached-dev cyrus-sasl-dev

RUN apk add --no-cache --update libmemcached-libs zlib libzip-dev libpng-dev supervisor

RUN docker-php-ext-configure zip
RUN docker-php-ext-configure gd
RUN docker-php-ext-install -j$(nproc) gd


RUN set -xe \
    && apk add --no-cache --update --virtual .phpize-deps $PHPIZE_DEPS \
    && apk add --no-cache --update --virtual .memcached-deps $MEMCACHED_DEPS \
    && pecl install memcached \
    && echo "extension=memcached.so" > /usr/local/etc/php/conf.d/20_memcached.ini \
    && rm -rf /usr/share/php7 \
    && rm -rf /tmp/* \
    && apk del .memcached-deps .phpize-deps

WORKDIR /app
ENV COMPOSER_ALLOW_SUPERUSER 1
COPY laravel-worker.ini /etc/supervisor.d/

EXPOSE 8000
COPY package.json ./
RUN npm i
COPY . .
RUN composer install
RUN npm run build
CMD supervisord -c /etc/supervisord.conf \
    && supervisorctl reread \
    && supervisorctl update \
    && supervisorctl start "laravel-worker:*"
CMD php artisan serv --host=0.0.0.0 --port=8000
