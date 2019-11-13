import Verification from "../../../entities/Verification";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";
import { sendVerificationSMS } from "./../../../utils/sendSMS";

export const startPhoneVerification = async (
  _,
  arg: StartPhoneVerificationMutationArgs
): Promise<StartPhoneVerificationResponse> => {
  const { phoneNumber } = arg;
  try {
    const existingVerification = await Verification.findOne({
      payload: phoneNumber
    });
    if (existingVerification) {
      existingVerification.remove();
    }

    const newVerification = await Verification.create({
      payload: phoneNumber,
      target: "PHONE"
    }).save();
    await sendVerificationSMS(newVerification.payload, newVerification.key);
    return {
      status: "Success",
      error: null
    };
  } catch (error) {
    return {
      status: "Fail",
      error: error.message
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    startPhoneVerification
  }
};

export default resolvers;

