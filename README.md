This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

To set up the project, you need to create a docker-compose.yml file. You can use the following example as a starting point, but remember to replace the variables with your own values:

version: "3.1"
services:
mysql:
image: mysql:8.0
command: --default-authentication-plugin=mysql_native_password
restart: always
environment:
MYSQL_ROOT_PASSWORD: myrootpassword
MYSQL_USER: development
MYSQL_PASSWORD: development
MYSQL_DATABASE: taskapp
ports: - 127.0.0.1:3307:3306

To start the Apollo Playground and access MySQL, you need to launch Docker Compose. Run the following command in your terminal:

docker-compose up
or
docker-compose up -d (detached method)

To initialize your MySQL database with the schema, enter the following command in your terminal:

docker exec -i taskapp-mysql-1 sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE' < db/schema.sql

Once everything is set up, you can access the Apollo Playground via your web browser at the following URL:

http://localhost:3000/api/graphql

This will allow you to interact with your GraphQL API.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
