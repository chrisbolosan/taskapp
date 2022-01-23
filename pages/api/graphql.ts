import { ApolloServer, gql } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { IResolvers } from "@graphql-tools/utils";
import type { NextApiHandler } from "next";

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`;

const resolvers: IResolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: "Nextjs" }];
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // Display old playground web app when opening http://localhost:3000/api/graphql in the browser
  plugins: [
    ...(process.env.NODE_ENV === "development"
      ? [ApolloServerPluginLandingPageGraphQLPlayground]
      : []),
  ],
});

// Now we need to start Apollo Server before creating the handler function.
const serverStartPromise = apolloServer.start();
let graphqlHandler: NextApiHandler | undefined;

const handler: NextApiHandler = async (req, res) => {
  if (!graphqlHandler) {
    await serverStartPromise;
    graphqlHandler = apolloServer.createHandler({ path: "/api/graphql" });
  }

  return graphqlHandler(req, res);
};

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
export default handler;
