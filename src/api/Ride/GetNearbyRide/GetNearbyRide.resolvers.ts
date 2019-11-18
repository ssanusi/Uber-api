import { Resolvers } from 'src/types/resolvers';
import { Between, getRepository } from "typeorm";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetNearbyRideResponse } from "../../../types/graph.d";
import authResolver from "../../../utils/resolverMiddleware";


const getNearbyRide = authResolver(
  async (_, __, { req }): Promise<GetNearbyRideResponse> => {
        const user: User = req.user;

    if (user.isDriving) {
      try {
          const ride = await getRepository(Ride).findOne(
        {
          status: "REQUESTING",
          pickupLat: Between(user.lastLat - 0.05, user.lastLat + 0.05),
          pickupLog: Between(user.lastLog - 0.05, user.lastLog + 0.05)
        },
            { relations:["passenger"] }
          );
          if (ride) {
            return {
                status: "Success",
                error: null,
                ride
            }
          }
          else {
              return {
                status: "Fail",
                error: "",
                ride: null
              }
          }
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
        error: "You are not a driver",
        ride: null
      };
    }
  }
);

const resolvers: Resolvers = {
    Query: {
        getNearbyRide
    }
}

export default resolvers;