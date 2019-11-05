import { Options } from "graphql-yoga";
import { createConnection } from 'typeorm';
import { log } from 'util'
import app from "./app";
import connectionOptions from './ormConfig'


const PORT: string | number = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";


const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => log(`Server Listening on ${PORT}`)

createConnection(connectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
}).catch((error) => log(error));

