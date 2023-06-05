## Installation

Before running the application, make sure you have the following prerequisites installed:

- Node.js [Node.js](https://nodejs.org/) version 14.20
- Docker [Docker](https://www.docker.com/) version 20.10.23


Follow these steps to set up and run the application:

1. Run the following command to install the dependencies:

   ```shell
   npm install

2. Run the following command to start docker container:

   ```shell
   npm run docker:up

3. Run migrations to create the database:
  
   ```shell
   npm run migrations:run

3. Run the seeders to populate the database with the data of the API supplied by the challenge https://fakestoreapi.com/products:
  
   ```shell
   npm run migrations:execute_seed

4. Run the following command to start the application:

   ```shell
    npm run start

Scripts
-------

In the project, you can run the following scripts:

- `npm run dev`: Start the application in development mode using Nodemon for automatic server restarts.
- `npm run lint`: Run ESLint to lint the codebase.
- `npm run docker:up`: Start the application and its dependencies using Docker Compose.
- `npm run migrations`:generate: Generate a new database migration file.
- `npm run migrations:run`: Run all pending database migrations.
- `npm run migrations:undo`: Revert the most recently executed database migration.
- `npm run migrations:seed_generate`: Generate a new database seed file.
- `npm run migrations:execute_seed`: Run all database seeders.

Make sure to execute the appropriate commands based on your needs and development environment.
