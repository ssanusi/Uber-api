import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import removeNull from '../../../utils/removeNull';
import authResolver from '../../../utils/resolverMiddleware';
import { ReportMovementMutationArgs, ReportMovementResponse } from './../../../types/graph.d';

const reportMovement = authResolver(async (_, args: ReportMovementMutationArgs, { req }): Promise<ReportMovementResponse> => {
    const user: User = req.user;
    const { input } = args
    const notNull = removeNull(input);
    try {
        await User.update({ id: user.id }, { ...notNull });
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
    Mutation :{
        reportMovement
    }
}

export default resolvers;