import { Resolvers } from 'src/types/resolvers';
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  GetRideDetailResponse,
  GetRideDetailsQueryArgs
} from "../../../types/graph.d";
import authResolver from "../../../utils/resolverMiddleware";

const getRideDetails = authResolver(
  async (
    _,
    args: GetRideDetailsQueryArgs,
    { req }
  ): Promise<GetRideDetailResponse> => {
    const user: User = req.user;
    const { rideId } = args;

    try {
      const ride = await Ride.findOne(
        { id: rideId },
        { relations: ["passenger", "driver"] }
      );
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
          error: "Ride not found",
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
        getRideDetails
    }
}

export default resolvers;