import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";
const completeEmailVerification = async (
  _,
  args: CompleteEmailVerificationMutationArgs,
  { req }
): Promise<CompleteEmailVerificationResponse> => {
  try {
    const { key } = args;
    const user: User = req.user;
    if (user.email) {
      const verification = await Verification.findOne({ key, payload: user.email });
      if (verification) {
        user.verifiedEmail = true;
        user.save();
        return {
          status: "Success",
          error: null
        };
      } else {
        return {
          status: "Fail",
          error: "Email cannot Be Verified"
        };
      }
    } else {
      return {
        status: "Fail",
        error: "Your User Don't Have Email to Verify"
      };
    }
  } catch (error) {
    return {
      status: "Fail",
      error: error.message
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    completeEmailVerification
  }
};

export default resolvers;
