const resolvers = {
    Subscription: {
        driverSubscription: {
            subscribe: (_, __, { pubSub }) => {
                return pubSub.asyncIterator("driverUpdate")
            }
        }
    }
}


export default resolvers