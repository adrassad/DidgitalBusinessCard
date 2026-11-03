# DidgitalBusinessCard

Read-only GraphQL API цифровой визитки. PostgreSQL хранит профиль, ссылки, навыки, опыт, достижения, образование и проекты. HTTP-слой только читает.

## Архитектура

Запрос проходит через resolver, service и repository. Resolver не обращается к Prisma. Вложенные списки — отдельные `@ResolveField`: навыки, опыт и достижения не читаются, пока поле не запрошено. Достижения принадлежат месту работы и не дублируют обязанности.

Дата опыта хранится первым числом месяца. В GraphQL она отдаётся как `YYYY-MM`. `isCurrent` равен `true`, когда `endDate` пустой.

Роль `dbc` владеет схемой и выполняет миграции и seed. Роль `dbc_app` используется приложением и имеет только `SELECT`.

## Запуск

Нужен Docker. Из корня репозитория:

    docker compose up --build

Первый запуск создаёт том, роль `dbc_app`, таблицы и начальные данные. Повторный запуск seed не дублирует строки: записи обновляются по постоянным id.

API: http://127.0.0.1:3000/graphql  
Apollo Sandbox открывается в браузере по этому адресу.  
База с хоста: `127.0.0.1:55433`, пользователь `dbc`, база `dbc`.

## Переменные

`DATABASE_URL` — строка подключения PostgreSQL.  
`PROFILE_SLUG` — какой профиль отдавать. В Compose это `andrey-sharapov`.  
`GRAPHQL_SANDBOX_ENABLED` — включает Sandbox и introspection. В Compose задано `true`, потому что `NODE_ENV=production` иначе выключает его.  
`PORT` — порт API, по умолчанию `3000`.  
`CORS_ORIGINS` — список origin через запятую. Пустая строка оставляет CORS выключенным.

## Проверка

    curl -s http://127.0.0.1:3000/graphql \
      -H 'content-type: application/json' \
      -d '{"query":"{ profile { name experience { company achievements { title sortOrder } } projects { name projectUrl repositoryUrl } skills { name level category { name } } } }"}'

У проекта нет поля `url`. Ссылки называются `projectUrl` и `repositoryUrl`.

    curl -s http://127.0.0.1:3000/health
    curl -s http://127.0.0.1:3000/health/ready
