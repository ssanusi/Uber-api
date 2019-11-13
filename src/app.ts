import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schemas";
import { verifyToken } from "./utils/auth";

class App {
  constructor(public app: GraphQLServer) {
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
      const user = verifyToken(token);
      if (user) {
        req.user = user;
      }
    }
    next();
  };
}

const appInstance = new GraphQLServer({
  schema
});

export default new App(appInstance).app;
