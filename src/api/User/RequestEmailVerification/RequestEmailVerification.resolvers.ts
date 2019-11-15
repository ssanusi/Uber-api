import User from "../../../entities//User";
import Verification from "../../../entities/Verification";
import authResolver from "../../../utils/resolverMiddleware";
import { RequestEmailVerificationResponse } from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";
import { sendVerificationEmail } from "./../../../utils/SendEmail";

const requestEmailVerification = authResolver(
  async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
    const user: User = req.user;
    if (user.email) {
      try {
        const oldVerification = await Verification.findOne({
          payload: user.email
        });
        if (oldVerification) {
          oldVerification.remove();
        }
        const newVerification = await Verification.create({
          payload: user.email,
          target: "EMAIL"
        }).save();
        await sendVerificationEmail(user.email,user.fullName,newVerification.key);
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
    } else {
      return {
        status: "Fail",
        error: "Your User has no Email to Verify"
      };
    }
  }
);

const resolvers: Resolvers = {
  Mutation: {
    requestEmailVerification
  }
};

export default resolvers;
