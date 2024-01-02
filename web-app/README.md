This is a [Next.js](https://nextjs.org/) template bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[TypeScript](https://www.typescriptlang.org/) is used for development and [Jest](https://jestjs.io/) for testing.

[EsLint](https://eslint.org/) is used for linting and [Prettier](https://prettier.io/) for formatting.

Styling is done with [SASS](https://sass-lang.com/).

[Docker](https://www.docker.com/) is used for containerization.

## Getting Started

### 1. Recover the repository

You can recover the repository by cloning it with git :

```bash
git clone https://github.com/vincentDubresson/next-js-template.git
```

You can also fork it or grab a zipped version of the [latest version](https://github.com/vincentDubresson/next-js-template/tags).

### 2. Install dependencies

In order to avoid possible errors from your code editor, it is preferable to install the dependencies locally :

```bash
npm install
```

### 3. Start the development server

Docker is used to run the development server. You can start it with the provided bash script :

```bash
./build-start.dev.sh
```

If the script does not run, modify the file so that it is executable :
  
```bash
sudo chmod +x build-start.dev.sh
```

### 4. Run Jest development tests

Jest is used to run the development tests. Use this command in the root of the project, when the server is running.

```bash
docker compose -f docker-compose.dev.yml exec website npm run test
```

### 5. Enjoy !

You can now start coding your Next.js application !

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about TypeScript, take a look at the following resources:

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript features.
- [Learn TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) - a quick introduction to TypeScript.

To learn more about Jest, take a look at the following resources:

- [Jest Documentation](https://jestjs.io/docs/getting-started) - learn about Jest features.
- [Learn Jest](https://jestjs.io/docs/tutorial-react) - a quick introduction to Jest.

To learn more about Docker, take a look at the following resources:

- [Docker Documentation](https://docs.docker.com/) - learn about Docker features.
- [Learn Docker](https://docs.docker.com/get-started/) - a quick introduction to Docker.

To learn more about EsLint, take a look at the following resources:

- [EsLint Documentation](https://eslint.org/docs/user-guide/getting-started) - learn about EsLint features.

To learn more about Prettier, take a look at the following resources:

- [Prettier Documentation](https://prettier.io/docs/en/index.html) - learn about Prettier features.

To learn more about SASS, take a look at the following resources:

- [SASS Documentation](https://sass-lang.com/documentation) - learn about SASS features.


