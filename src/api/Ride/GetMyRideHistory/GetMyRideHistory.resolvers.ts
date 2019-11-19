import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetMyRidesHistoryResponse } from "../../../types/graph.d";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";

const getMyRides = authResolver(
  async (_, __, { req }): Promise<GetMyRidesHistoryResponse> => {
    const user: User = req.user;
    try {
      const rides = await Ride.find({
        where: [{ passengerId: user.id }, { driverId: user.id }]
      });
      return {
        status: "Success",
        error: null,
        rides
      };
    } catch (error) {
      return {
        status: "Fail",
        error: error.Message,
        rides: null
      };
    }
  }
);

const resolvers: Resolvers = {
  Query: {
    getMyRides
  }
};

export default resolvers;
