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

## Примеры GraphQL

Схема содержит query `profile`. Slug задаёт `PROFILE_SLUG`. Introspection возвращает `mutationType: null`.

Полная визитка читается одним запросом:

    {
      profile {
        id
        slug
        name
        headline
        description
        links {
          id
          type
          url
          label
          sortOrder
        }
        skills {
          id
          name
          level
          sortOrder
          category {
            id
            code
            name
          }
        }
        experience {
          id
          company
          position
          description
          responsibilities
          startDate
          endDate
          isCurrent
          sortOrder
          achievements {
            id
            title
            description
            sortOrder
          }
        }
        education {
          id
          institution
          degree
          specialization
          description
          graduationYear
          sortOrder
        }
        projects {
          id
          name
          description
          repositoryUrl
          projectUrl
          status
          sortOrder
        }
      }
    }

Ответ этого запроса для `andrey-sharapov`: имя «Андрей Шарапов», `links` — 4, `skills` — 25, `experience` — 3, `education` — 3, `projects` — 1.

Профиль:

    { profile { slug name headline } }

    {
      "data": {
        "profile": {
          "slug": "andrey-sharapov",
          "name": "Андрей Шарапов",
          "headline": "Разработка backend и интеграции API"
        }
      }
    }

Опыт. Дата приходит как `YYYY-MM`. Пустой `endDate` даёт `isCurrent: true`. У части мест работы `achievements` — пустой массив.

    {
      profile {
        experience {
          company
          position
          startDate
          endDate
          isCurrent
          sortOrder
          achievements {
            title
            description
            sortOrder
          }
        }
      }
    }

    {
      "data": {
        "profile": {
          "experience": [
            {
              "company": "ДЭФО офисная мебель",
              "position": "Ведущий программист 1С",
              "startDate": "2017-04",
              "endDate": null,
              "isCurrent": true,
              "sortOrder": 1,
              "achievements": [
                {
                  "title": "Перевод филиалов в новую учётную систему",
                  "description": "Благодарность управляющей компании ДЭФО за работу по переводу филиалов в новую учётную систему.",
                  "sortOrder": 1
                },
                {
                  "title": "Благодарность за вклад в развитие торговой марки ДЭФО",
                  "description": "Благодарность 2024 года за вклад и высокую эффективность в развитии торговой марки ДЭФО.",
                  "sortOrder": 2
                }
              ]
            },
            {
              "company": "БЛАНКТ",
              "position": "Программист 1С",
              "startDate": "2016-02",
              "endDate": "2017-04",
              "isCurrent": false,
              "sortOrder": 2,
              "achievements": []
            },
            {
              "company": "Элит-профит",
              "position": "Сервис-инженер / программист 1С",
              "startDate": "2006-02",
              "endDate": "2013-12",
              "isCurrent": false,
              "sortOrder": 3,
              "achievements": []
            }
          ]
        }
      }
    }

`profile(slug: "andrey-sharapov")` возвращает `Unknown argument "slug" on field "Query.profile".`  
`{ skills { name } }` возвращает `Cannot query field "skills" on type "Query".`  
`{ profile { projects { url } } }` возвращает `Cannot query field "url" on type "ProjectModel".`
