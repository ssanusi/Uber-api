import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schemas";
import { verifyToken } from "./utils/auth";

class App {
  public app: GraphQLServer;
  public pubSub: any
  constructor() {
    this.pubSub = new PubSub()
    this.pubSub.ee.setMaxListeners(99)
    this.app = new GraphQLServer({
      schema,
      context: req => {
        return {
          req: req.request,
          pubSub: this.pubSub
        };
      }
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(logger("dev"));
    this.app.use(helmet());
    this.app.use(this.jwt);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("token");
    if (token) {
      const user = await verifyToken(token);
      if (user) {
        req.user = user;
      }
    } else {
      req.user = undefined;
    }
    next();
  };
}

export default new App().app;
