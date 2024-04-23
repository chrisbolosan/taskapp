import { ApolloServer, gql } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { IResolvers } from "@graphql-tools/utils";
import type { NextApiHandler } from "next";
import mysql from "serverless-mysql";

const typeDefs = gql`
  enum TaskStatus {
    active
    completed
  }

  type Task {
    id: Int!
    title: String!
    status: TaskStatus!
  }

  input CreateTaskInput {
    title: String!
  }

  input UpdateTaskInput {
    id: Int!
    title: String
    status: TaskStatus
  }

  type Query {
    tasks(status: TaskStatus): [Task!]!
    task(id: Int!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: Int!): Task
  }
`;
interface Task {
  id: number;
  title: string;
  task_status: TaskStatus;
}
type TaskStatus = {
  active: "ACTIVE";
  completed: "COMPLETED";
};

type TasksDbRow = {
  id: number;
  title: string;
  task_status: TaskStatus;
};

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

type TasksDbQueryResult = TasksDbRow[];
interface ApolloContext {
  db: mysql.ServerlessMysql;
}

const resolvers: IResolvers<any, ApolloContext> = {
  Query: {
    async tasks(parent, args, context): Promise<Task[]> {
      const tasks = await context.db.query<TasksDbQueryResult>(
        "SELECT id, title, task_status FROM tasks"
      );
      await db.end();
      return tasks.map(({ id, title, task_status }) => ({
        id,
        title,
        status: task_status,
      }));
    },
    task(parent, args, context) {
      return null;
    },
  },
  Mutation: {
    createTask(parent, args, context) {
      return null;
    },
    updateTask(parent, args, context) {
      return null;
    },
    deleteTask(parent, args, context) {
      return null;
    },
  },
};

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    port: 3307,
  },
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  plugins: [
    ...(process.env.NODE_ENV === "development"
      ? [ApolloServerPluginLandingPageGraphQLPlayground]
      : []),
  ],
});

const serverStartPromise = apolloServer.start();
let graphqlHandler: NextApiHandler | undefined;

const handler: NextApiHandler = async (req, res) => {
  if (!graphqlHandler) {
    await serverStartPromise;
    graphqlHandler = apolloServer.createHandler({ path: "/api/graphql" });
  }

  return graphqlHandler(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
