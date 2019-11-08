import User from "../../../entities/User";
import {createToken} from "../../../utils/auth";
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
      const token = createToken(existingUser.id)
      return {
        status: "Success",
        error: null,
        token
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
   const newUser = await User.create({
      ...args,
      profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
    }).save();
     const token = createToken(newUser.id)
      return {
        status: "Success",
        error: null,
        token
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
