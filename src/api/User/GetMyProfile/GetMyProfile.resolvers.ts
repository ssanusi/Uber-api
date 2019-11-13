import authResolver from "../../../utils/resolverMiddleware";
import { GetMyProfileResponse } from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";

const getMyProfile = authResolver(
  async (_, args, { req }): Promise<GetMyProfileResponse> => {
    const { user } = req;
    return {
      status: "Success",
      error: null,
      user
    };
  }
);

const resolvers: Resolvers = {
  Query: {
    getMyProfile
  }
};

export default resolvers;
