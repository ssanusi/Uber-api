import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/resolverMiddleware';
import { ToggleDrivingModeResponse } from './../../../types/graph.d';

const toggleDrivingMode = authResolver(async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
    const user: User = req.user;
    try {
        user.isDriving = !user.isDriving;
        user.save();
        return {
            status: "Success",
            error: null
        }
    } catch (error) {
        return{
            status: "Fail",
            error: error.message
        }
    }
})
const resolvers: Resolvers = {
    Mutation: {
        toggleDrivingMode
    }
}

export default resolvers;