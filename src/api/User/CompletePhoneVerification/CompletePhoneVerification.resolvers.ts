import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";

const completePhoneVerification = async (
  _,
  args: CompletePhoneVerificationMutationArgs
): Promise<CompletePhoneVerificationResponse> => {
  const { input: { phoneNumber, key } } = args;
  try {
    const verification = await Verification.findOne({
      payload: phoneNumber,
      key
    });

    if (!verification) {
      return {
        status: "Fail",
        error: "Verification Token not valid",
        token: null
      };
    } else {
      verification.verified = true
      verification.save()
    }
  } catch (error) {
    return {
      status: "Fail",
      error: error.message,
      token: null
    };
  }

  try {
    const user = await User.findOne({ phoneNumber });
    if (user) {
      return {
        status: "Success",
        error: null,
        token: "Coming Soon"

      }
    } else {
      return {
        status: "Success",
        error: null,
        token: null
      }
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
    completePhoneVerification
  }
};

export default resolvers;
