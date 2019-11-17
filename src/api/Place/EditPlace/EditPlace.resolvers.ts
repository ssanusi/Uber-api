import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from '../../../types/resolvers';
import removeNull from "../../../utils/removeNull";
import authResolver from "../../../utils/resolverMiddleware";

const editPlace = authResolver(
  async (
    _,
    args: EditPlaceMutationArgs,
    { req }
  ): Promise<EditPlaceResponse> => {
    const user: User = req.user;
        const { input } = args;
        const { placeId, ...params } = input
        const notNUll = removeNull(params);

    try {
        const place = await Place.findOne({ id: placeId });
        if (place) {
            if (place.userId === user.id) {
                await Place.update({ id: placeId }, { ...notNUll });
                return {
                    status: "Success",
                    error: null
                };
            } else {
                return {
                    status: "Fail",
                    error: "UnAuthorized"
                };
            }
        } else {
            return {
                status: "Fail",
                error: "Place not found"
            }
        }
    } catch (error) {

            return {
                status: "Fail",
                error: error.message
            }
    }
  }
);


const resolvers: Resolvers = {
    Mutation: {
        editPlace
    }
}

export default resolvers;