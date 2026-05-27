FROM php:8.3-cli

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y \
    unzip zip git curl libzip-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql pgsql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install --no-interaction --prefer-dist

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=10000