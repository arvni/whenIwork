FROM php:8.2-alpine

COPY --from=node:18.16.1-alpine /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node:18.16.1-alpine /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apk add --no-cache --update libmemcached-libs zlib libzip-dev libpng-dev libsodium libsodium-dev  jpeg-dev
# packages
RUN docker-php-ext-install mysqli pdo_mysql sodium zip
# memcached
ENV MEMCACHED_DEPS zlib-dev libmemcached-dev cyrus-sasl-dev


RUN docker-php-ext-configure zip
RUN docker-php-ext-configure gd --enable-gd  --with-jpeg-dir
RUN docker-php-ext-configure sodium
RUN docker-php-ext-install -j$(nproc) gd --enable-gd --with-jpeg-dir


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

EXPOSE 8000
COPY . .
RUN npm i
RUN composer install
RUN npm run build -f
CMD php artisan serv --host=0.0.0.0 --port=8000
