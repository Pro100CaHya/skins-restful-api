# Skins RESTful API

A Simple RESTFul API based on:

- Node.js
- node-cache
- Fastify
- PostgreSQL
- TypeScript

## How to start the project

1. Clone this repo
2. Create *.env* file
3. Add the following variables:

    - SKINPORT_API_URL - External API URL
    - POSTGRES_HOST - Host to connect Postgres Database
    - POSTGRES_DB - Postgres database name
    - POSTGRES_USER - Postgres database user
    - POSTGRES_PASSWORD - Postgres database password
    - POSTGRES_PORT - Postgres database port
    - PORT - HTTP Server port
    - CACHE_TTL - Cache time-to-live

You can copy these variables from .env.example file

3. Install Node dependencies:

```
npm i
```

4. Exec docker compose command to launch local PostgreSQL:

```sh
docker compose up -d
```

5. After postgres launching run migration file to create table with users:

```
npm run migrate
```

6. Run app in dev mode:

```
npm run dev
```