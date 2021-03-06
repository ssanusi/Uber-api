import { Resolvers } from "../../..//types/resolvers";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from "../../../types/graph.d";
import authResolver from "../../../utils/resolverMiddleware";

const requestRide = authResolver(
  async (
    _,
    args: RequestRideMutationArgs,
    { req, pubSub }
  ): Promise<RequestRideResponse> => {
    const user: User = req.user;
    const { input } = args;
    const rideData = { ...input, passenger: user };

    if (!user.isRiding && !user.isDriving) {
      try {
        const ride = await Ride.create(rideData).save();
        pubSub.publish("rideRequest", { nearbySubscription: ride });
        return {
          status: "Success",
          error: null,
          ride
        };
      } catch (error) {
        return {
          status: "Fail",
          error: error.message,
          ride: null
        };
      }
    } else {
      return {
        status: "Fail",
        error: "You  can't request two rides or drive and request",
        ride: null
      };
    }
  }
);

const resolvers: Resolvers = {
  Mutation: {
    requestRide
  }
};

export default resolvers;
