import User from '../../../entities/User';
import authResolver from '../../../utils/resolverMiddleware';
import { UpdateMyProfileMutationArgs,UpdateMyProfileResponse,  } from './../../../types/graph.d';
import { Resolvers } from './../../../types/resolvers.d';


const updateMyProfile = authResolver(async (_, args:UpdateMyProfileMutationArgs, { req }): Promise<UpdateMyProfileResponse> => {
    const user:User = req.user;
    const { input } = args;
    const notNull = {};
    Object.keys(input).forEach(key => {
        if (input[key] !== null) {
            notNull[key] = input[key];
        }
    })

    try {
        if (input.password !== null) {
            console.log(user)
            user.password = input.password;
            user.save();
        }
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
}
)

const resolvers: Resolvers = {
    Mutation: {
      updateMyProfile
    }
}

export default resolvers;