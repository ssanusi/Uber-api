import Place from '../../../entities/Place';
import User from '../../../entities/User';
import { AddPlaceMutationArgs, AddPlaceResponse } from '../../../types/graph.d';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/resolverMiddleware';

const addPlace = authResolver(async (_, args: AddPlaceMutationArgs, { req }): Promise<AddPlaceResponse> => {
    const user: User = req.user;
    const { input } = args;
    try {
        await Place.create({ ...input, user });
        return {
            status: "Success",
            error: null
        }
    } catch (error) {
        return {
            status: "Fail",
            error: error.message
        }

    }
})

const resolvers: Resolvers = {
    Mutation: {
        addPlace
    }
}

export default resolvers;