import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    driverSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("driverUpdate");
        },
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            driverSubscription: {
              lastLog: driversLastLog,
              lastLat: driversLastLat
            }
          } = payload;
          const { lastLog: userLastLog, lastLat: userLastLat } = user;
          return (
            driversLastLog >= userLastLog - 0.05 &&
            driversLastLog <= userLastLog + 0.05 &&
            driversLastLat >= userLastLat - 0.05 &&
            driversLastLat <= userLastLat + 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
