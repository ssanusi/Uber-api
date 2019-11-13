import User from "../../../entities/User";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";
import { createToken } from "./../../../utils/auth";

const emailSignIn = async (
  _,
  args: EmailSignInMutationArgs
): Promise<EmailSignInResponse> => {
  const { input: { email, password } } = args;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return {
        status: "Fail",
        error: "No User Found with email",
        token: null
      };
    }

    const checkPassword = await existingUser.comparePassword(password);

    if (checkPassword) {
      const token = createToken(existingUser.id);
      return {
        status: "Ok",
        error: null,
        token
      };
    } else {
      return {
        status: "Fail",
        error: "Invalid Credential",
        token: null
      };
    }
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
    emailSignIn
  }
};

export default resolvers;
