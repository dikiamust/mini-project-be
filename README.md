# Pokemon List

This backend application showcases a dynamic list of Pokémon, seamlessly integrated with the PokeAPI, developed using ExpressJS, Prisma, and PostgreSQL.

## Clone

```sh
git clone https://github.com/dikiamust/mini-project-be

cd mini-project-be
```

## Environment Variables

You can see it in the .env.example file

```sh
cp .env.example .env
```

## Installation

```sh
yarn # or yarn install
```

## Database Migration

```sh
# Generate Prisma Client
 yarn db:generate

#  run migration
yarn db:migrate

```

## Running the app

```bash

# watch mode
$ yarn dev

# production mode
$ yarn start

```

## API Documentation

After running all the commands above , you can access the API at [http://localhost:8000](http://localhost:8000)

1. **My Pokemon List**

   - `GET /pokemons/mine`

2. **Catch Pokemon**

   - `POST /pokemons/catch/:pokemonId`

3. **Release Pokemon**

   - `PUT /pokemons/release/:pokemonId`

4. **Rename Pokemon**

   - `PUT /pokemons/rename/:pokemonId`

## Frontend
You can find the frontend app here:
https://github.com/dikiamust/mini-project-fe
