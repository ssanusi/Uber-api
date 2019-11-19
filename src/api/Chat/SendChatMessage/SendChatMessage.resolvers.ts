import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse
} from "../../../types/graph.d";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";

const sendChatMessage = authResolver(
  async (
    _,
    args: SendChatMessageMutationArgs,
    { req, pubSub }
  ): Promise<SendChatMessageResponse> => {
    const user: User = req.user;
    const {
      input: { chatId, text }
    } = args;
    try {
      const chat = await Chat.findOne({ id: chatId });
      if (chat) {
        if (chat.passengerId === user.id || chat.driverId === user.id) {
          const message = await Message.create({
            text,
            chat,
            user
          }).save();
          pubSub.publish("NewMessage", { messageSubscription: message });
          return {
            status: "Success",
            error: null,
            message
          };
        } else {
          return {
            status: "Fail",
            error: "You Are not Authorized",
            message: null
          };
        }
      } else {
        return {
          status: "Fail",
          error: "Chat not found",
          message: null
        };
      }
    } catch (error) {
      return {
        status: "Fail",
        error: error.message,
        message: null
      };
    }
  }
);

const resolvers: Resolvers = {
  Mutation: {
    sendChatMessage
  }
};

export default resolvers;
