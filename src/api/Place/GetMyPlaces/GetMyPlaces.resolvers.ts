import User from "../../../entities/User";
import { GetMyPlacesResponse } from '../../../types/graph.d';
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";

const getMyPlaces = authResolver(
  async (_, __, { req }):Promise<GetMyPlacesResponse> => {
    try {
      const user = await User.findOne(
        { id: req.user.id },
        { relations:["places"] }
      )
      if (user) {
        return {
          status: "Success",
          error: null,
          places: user.places
        };
      } else {
        return {
          status: "Fail",
          error: "User Not Found",
          places: null
        };
      }
    } catch (error) {
      return {
        status: "Fail",
        error: error.message,
        places: null
      };
    }
  }
);

const resolvers: Resolvers = {
  Query: {
    getMyPlaces
  }
};

export default resolvers;
