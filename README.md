# ErdTrade

A website to find people to trade with in Elden Ring

Using https://docs.eldenring.fanapis.com/ for all info!

## Prerequisites

To begin, you will need to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed with a Docker Hub account. Docker is useful for making development fast and predictable – it seamlessly builds and runs applications with a configuration setup which is indiscriminate of your operating system.

> Having docker installed takes away the need for a local installation of [Postgres](https://www.postgresql.org/)

After installing _Docker Desktop_ and cloning the repository, head over to `/config/` and create a `.env.dev` and `.env.prod` file following the `.env.example` variables.

Once done, from the root of the monorepo, open up a terminal and launch the following command: `npm run server:dev` – this will spin up and compose the docker container, with all the needed networking and volumes.

To access the API documentation, go to http://localhost:3000/docs – or to access PGAdmin, go to http://localhost:5050 and log-in with the credentials provided in your respective `.env.dev/prod` file.

## Recommendations

Download the following VSCode extensions:

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

> **Note:** When utilising Docker to run your development environment, you lose the ability to hot-refresh with Nest.js – this is bothersome, but spinning up a new composed container takes less than a second. To do this, simply go to the Docker tab (if you installed the extension) and right click `erdtrade` and select `Compose Down`
