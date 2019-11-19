import { withFilter } from "graphql-yoga";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    messageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("NewMessage"),
        async (payload, __, { context }) => {
          const {
            messageSubscription: { chatId }
          } = payload;
          const user: User = context.currentUser;
          try {
            const chat = await Chat.findOne({ id: chatId });
            if (chat) {
              return chat.driverId === user.id || chat.passengerId === user.id;
            }
            return false;
          } catch (error) {
            return false;
          }
        }
      )
    }
    }
};

export default resolvers;