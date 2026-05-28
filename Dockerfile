FROM php:8.3-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git curl unzip zip libzip-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . /app

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

RUN mkdir -p storage bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache

RUN php artisan storage:link

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=10000