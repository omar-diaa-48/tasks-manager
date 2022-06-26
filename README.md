## Description

[Tasks Management App](https://github.com/omar-diaa-48/tasks-manager)

## Installation

```bash
$ git clone https://github.com/omar-diaa-48/tasks-manager.git
```

# for backend

```bash
$ cd backend && npm install
```

Add database with name like in the .env.example file, or a custom one but use the same in the .env file

Add .env file with the proper environment variables

To start project

```bash
$ npm start:dev
```

To seed the database with initial data

```bash
$ knex seed:run
```

# for frontend

```bash
$ cd frontend && npm install
```

Add .env file with the proper environment variables

```bash
$ npm start
```
