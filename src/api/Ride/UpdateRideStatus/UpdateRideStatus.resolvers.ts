import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";

const updateRideStatus = authResolver(
  async (
    _,
    args: UpdateRideStatusMutationArgs,
    { req, pubSub }
  ): Promise<UpdateRideStatusResponse> => {
    const user: User = req.user;
    const {
      input: { rideId, status }
    } = args;
    if (user.isDriving) {
      try {
        let ride: Ride | undefined;
        if (status === "ACCEPTED") {
          ride = await Ride.findOne({ id: rideId, status: "REQUESTING" });
          if (ride) {
            ride.driver = user;
            user.isTaken = true;
          }
        } else {
          ride = await Ride.findOne({ id: rideId, driver: user });
        }
        if (ride) {
          ride.status = status;
          ride.save();
           pubSub.publish("rideStatus",{ rideStatusSubscription: ride })
          return {
            status: "Success",
            error: null
          };
        } else {
          return {
            status: "Fail",
            error: "cant Update Ride"
          };
        }
      } catch (error) {
        return {
          status: "Fail",
          error: error.message
        };
      }
    } else {
      return {
        status: "Fail",
        error: "Your are not a driver"
      };
    }
  }
);
const resolvers: Resolvers = {
  Mutation: {
    updateRideStatus
  }
};

export default resolvers;
