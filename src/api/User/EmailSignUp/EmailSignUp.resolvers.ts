// import { validate } from "class-validator";
import { EmailAddressResolver } from 'graphql-scalars';
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { createToken } from "../../../utils/auth";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";
import { sendVerificationEmail } from "./../../../utils/SendEmail";

const emailSignUp = async (
  _,
  args: EmailSignUpMutationArgs
): Promise<EmailSignUpResponse> => {
  const {
    input: { email, phoneNumber }
  } = args;
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: "Fail",
        error: "Account Already Exit Login Instead",
        token: null
      };
    } else {
      const verification = await Verification.findOne({
        payload: phoneNumber,
        verified: true
      });
      if (verification) {
        const newUser = await User.create({ ...args.input }).save();
        if (newUser.email) {
          const emailVerification = await Verification.create({
            payload: newUser.email,
            target: "EMAIL"
          }).save();
          await sendVerificationEmail(newUser.email,newUser.fullName, emailVerification.key);
        }
        const token = createToken(newUser.id);
        return {
          status: "Success",
          error: null,
          token
        };
      } else {
        return {
          status: "Fail",
          error: "You haven't verify your Phone Number",
          token: null
        };
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
  EmailAddress: EmailAddressResolver,
  Mutation: {
    emailSignUp
  }
};

export default resolvers;
