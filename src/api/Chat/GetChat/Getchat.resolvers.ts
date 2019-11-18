import Chat from '../../../entities/Chat';
import User from '../../../entities/User';
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph.d";
import { Resolvers } from '../../../types/resolvers';
import authResolver from "../../../utils/resolverMiddleware";

const getChat = authResolver(
  async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        const { chatId } = args

        try {
          const chat = await Chat.findOne({ id: chatId }, { relations: ["messages"]});
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              return {
                status: "Success",
                error: null,
                chat
              }
            }
            else {
              return {
                status: "Fail",
                error: "You are not Authorized",
                chat: null
              }
            }
          } else {
            return {
              status: "Fail",
              error: "Chat not Found",
              chat: null
            }
          }

        } catch (error) {
            return {
                status: "Fail",
                error: error.message,
                chat: null
          }
        }
  }
);


const resolvers: Resolvers = {
  Query: {
    getChat
  }
}

export default resolvers;