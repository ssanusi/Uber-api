import Place from "../../../entities/Place";
import User from "../../../entities/User";
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse
} from "../../../types/graph";
import { Resolvers } from '../../../types/resolvers';
import authResolver from "../../../utils/resolverMiddleware";

const deletePlace = authResolver(
  async (
    _,
    args: DeletePlaceMutationArgs,
    { req }
  ): Promise<DeletePlaceResponse> => {
    const user: User = req.user;
    const { placeId } = args;
    try {
      const place = await Place.findOne({ id: placeId });
      if (place) {
        if (place.userId === user.id) {
          place.remove();
          return {
            status: "Success",
            error: null
          };
        } else {
          return {
            status: "Fail",
            error: "You are not authorized to delete this place"
          };
        }
      } else {
        return {
          status: "Fail",
          error: "Place Not found"
        };
      }
    } catch (error) {
      return {
        status: "Fail",
        error: error.message
      };
    }
  }
);

const resolvers: Resolvers = {
    Mutation: {
         deletePlace
     }
}

export default resolvers;