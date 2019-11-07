import cors from "cors";
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from "morgan";
import schema from "./schemas";

class App {

  constructor(public app: GraphQLServer){
   this.middlewares();
  }

  private middlewares = () : void => {
    this.app.use(cors());
    this.app.use(logger('dev'));
    this.app.use(helmet());
  }
}

const appInstance = new GraphQLServer({
  schema
});

export default new App(appInstance).app;