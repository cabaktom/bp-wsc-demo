# Bachelor's thesis (2022/23) - Student workshop on scientific computing

This is the implementation of my bachelor's thesis which can be found [here](https://dspace.cvut.cz/handle/10467/109557).

> The work deals with the process of developing a new Web portal for organizing the annual scientific conference, which will replace its currently used form. The development begins with an analysis of the current solution, followed by the design and selection of technologies for the new solution, its implementation, deployment, and testing. The newly created Web portal is implemented as a full-stack web application in the Next.js framework. It provides clear information about the conference and the possibility to register for interested parties and participants. It allows organizers to plan the conference, including editing the content of organizational pages and gallery, managing participants, and creating the program. The Web portal is deployed on the Digital Ocean platform along with the database, but also offers the possibility of local deployment using Docker.

## Deployment

Needed tools for local deployment

- [Node.js](https://nodejs.org/en) + [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) (V2, CLI plugin or desktop)

Deployment options

- [Digital Ocean](https://www.digitalocean.com/) (production)
- Local (production)
- Local (development)

## Digital Ocean

The best way to deploy the application on Digital Ocean is to use the [DO App Platform](https://www.digitalocean.com/products/app-platform). The platform allows you to deploy the application directly from the GitHub repository. The deployment process is automatic and the application is updated after each push to the repository.

Adding the application to a project makes it easy to add a database. The database can be added to the project in the form of a managed PostgreSQL database. The database is automatically connected to the application and the connection string is set as an environment variable.

Based on the `.env.example` file, set the environment variables in the Digital Ocean platform (the values are just an example)

```env
# corresponds to the URL and port of the application (within the container)
NEXTAUTH_URL="http://localhost:3000"
# the value can be generated in the terminal, for example by the command `openssl rand -base64 32`
NEXTAUTH_SECRET="VkoQHEqNMCkM11oCWdUdEe3NhqaQ9vRirw9bF/LCjvw="
POSTGRES_VERSION=15
POSTGRES_USER=admin
POSTGRES_PASSWORD=pwd
POSTGRES_DB=db
PLATFORM=DO # Digital Ocean
```

When deploying the app on the Digital Ocean platform, it is **necessary** to set the `PLATFORM=DO` environment variable. This ensures correct revalidation of static pages.

To setup and seed the database, locally set the `DATABASE_URL` environment variable to the deployed database and run the following commands

```bash
npm install
npx prisma db push
npx prisma db seed
```

## Local (production)

Install dependencies

    npm install

Based on the `.env.example` file, create a `.env` file and set local variables (the values are just an example)

```env
# corresponds to the URL and port of the application (within the container)
NEXTAUTH_URL="http://localhost:3000"
# the value can be generated in the terminal, for example by the command `openssl rand -base64 32`
NEXTAUTH_SECRET="VkoQHEqNMCkM11oCWdUdEe3NhqaQ9vRirw9bF/LCjvw="
POSTGRES_VERSION=15
POSTGRES_USER=admin
POSTGRES_PASSWORD=pwd
POSTGRES_DB=db
```

Start the application and the database for production (the build process may take a while).

    docker compose up

The production version of the application is now available at [localhost:3000](http://localhost:3000/). The database is available at [localhost:5432](http://localhost:5432/).

## Local (development)

Install dependencies

    npm install

Start, create and seed the database

    docker compose up -d db
    npx prisma db push
    npx prisma db seed

Start the application in development mode

    npm run dev
