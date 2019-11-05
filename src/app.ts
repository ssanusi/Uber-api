import cors from "cors";
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from "morgan";
import schema from "./schemas";

class App {
   public app: GraphQLServer;
   constructor(){
       this.app = new GraphQLServer({
        schema
       });
       this.middlewares();
   }
   private middlewares = () : void => {
     this.app.use(cors());
     this.app.use(logger('dev'));
     this.app.use(helmet());
   }
}

export default new App().app;