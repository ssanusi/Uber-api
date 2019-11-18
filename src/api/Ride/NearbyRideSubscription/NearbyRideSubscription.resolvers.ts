
import { withFilter } from 'graphql-yoga';
import User from '../../../entities/User';

const resolvers = {
    Subscription: {
        nearbyRideSubscription: {
            subscribe: withFilter((_, __, { pubSub }) => {
                return pubSub.asyncIterator("rideRequest")
            }, (payload, __, { context }) => {
                const user: User = context.currentUser
                const {
                    nearbySubscription: {
                        pickUpLat,
                        pickUpLog
                    } } = payload
                const { lastLat: userLastLat, lastLog: userLastLog } = user;
                return (
                    pickUpLat >= userLastLat - 0.05 &&
                    pickUpLat <= userLastLat + 0.05 &&
                    pickUpLog >= userLastLog - 0.05 &&
                    pickUpLog <= userLastLog - 0.05
                )
            }

            )
      }
    }
  }


export default resolvers;