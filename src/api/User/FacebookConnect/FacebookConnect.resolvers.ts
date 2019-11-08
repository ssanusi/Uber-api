import User from "../../../entities/User";
import { FacebookResponse, FacebookUserInput } from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";

const facebookConnect = async (
  _,
  args: FacebookUserInput
): Promise<FacebookResponse> => {
  const { fbId } = args;
  try {
    const existingUser = await User.findOne({ fbId });
    if (existingUser) {
      return {
        status: "Success",
        error: null,
        token: "Coming Soon"
      };
    }
  } catch (error) {
    return {
      status: "Fail",
      error: error.message,
      token: null
    };
  }

  try {
   await User.create({
      ...args,
      profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
    }).save();

      return {
        status: "Success",
        error: null,
        token: "coming soon"
      };
  } catch (error) {
    return {
      status: "Fail",
      error: error.message,
      token: null
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    facebookConnect
  }
};

export default resolvers;
