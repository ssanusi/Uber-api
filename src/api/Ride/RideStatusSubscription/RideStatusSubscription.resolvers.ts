
import { withFilter } from 'graphql-yoga';
import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
    Subscription: {
        rideStatusSubscription: {
            subscribe: withFilter((_, __, { pubSub }) => pubSub.asyncIterator("UpdateRide"), (payload, __, { context }) => {
                    const user: User = context.currentUser;
                    const { rideStatusSubscription: { driverId, passengerId } } = payload;
                    return user.id === driverId || user.id === passengerId;
            })
        }
    }

}

export default resolvers;