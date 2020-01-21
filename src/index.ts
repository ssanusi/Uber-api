import "./utils/envConfig"

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import { log } from "util";
import app from "./app";
import connectionOptions from "./ormConfig";
import { verifyToken } from "./utils/auth";



const PORT: string | number = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async connectionParams => {
      const { token } = connectionParams;
      if (token) {
        const user = await verifyToken(token);
        if (user) {
          return {
            currentUser: user
          };
        } else {
          return {
            currentUser: null
          };
        }
      }
      throw new Error("No JWT Can't Subtribe");
    }
  }
};

const handleAppStart = () => log(`Server Listening on ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch(error => log(error));
