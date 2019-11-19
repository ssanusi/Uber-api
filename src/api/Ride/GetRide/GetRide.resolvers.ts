import { Resolvers } from "src/types/resolvers";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetRideQueryArgs, GetRideResponse } from "../../../types/graph.d";
import authResolver from "../../../utils/resolverMiddleware";

const getRide = authResolver( async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
    const user: User = req.user;
    const { rideId } = args;
    try {
      const ride = await Ride.findOne({ id: rideId });
      if (ride) {
        if (ride.passengerId === user.id || ride.driverId === user.id) {
          return {
            status: "Success",
            error: null,
            ride
          };
        } else {
          return {
            status: "Fail",
            error: "You are not Authorized",
            ride: null
          };
        }
      } else {
        return {
          status: "Fail",
          error: "Ride Not Found",
          ride: null
        };
      }
    } catch (error) {
      return {
        status: "Fail",
        error: error.message,
        ride: null
      };
    }
  }
);

const resolvers: Resolvers = {
    Query: {
        getRide
    }
}

export default resolvers;