# DidgitalBusinessCard

Read-only GraphQL API цифровой визитки. Данные лежат в PostgreSQL. Приложение их только читает.

## Запуск

Нужны Docker и том `digital-business-card-db-data`, в котором уже применены миграции и seed.

    docker compose up -d --build

API: http://127.0.0.1:3000/graphql  
База с хоста: `127.0.0.1:55433`, пользователь `dbc`, база `dbc`.

Контейнер приложения подключается как `dbc_app` и имеет только `SELECT`.

## Запрос

    curl -s http://127.0.0.1:3000/graphql \
      -H 'content-type: application/json' \
      -d '{"query":"{ profile { name headline links { type label } projects { name projectUrl repositoryUrl } experience { company startDate endDate isCurrent } education { institution graduationYear } skills { name level category { name } } } }"}'

У проекта нет поля `url`. Ссылки называются `projectUrl` и `repositoryUrl`. Запрос `projects { url }` возвращает 400.

## Проверки

    node --import tsx --test src/graphql/format-error.test.ts
    curl -s http://127.0.0.1:3000/health
    curl -s http://127.0.0.1:3000/health/ready

`/health` не обращается к базе. `/health/ready` выполняет `SELECT 1`.
