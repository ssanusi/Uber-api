
import { Resolvers } from 'src/types/resolvers';
import { Between, getRepository } from 'typeorm';
import User from '../../../entities/User';
import authResolver from '../../../utils/resolverMiddleware';

const getNearbyDrivers = authResolver(async (_, __, { req })  => {
    const user: User = req.user;
    try {
        const nearbyDrivers: User[] = await  getRepository(User).find({
            isDriving: true,
            lastLat: Between(user.lastLat - 0.05, user.lastLat + 0.05 ),
            lastLog: Between(user.lastLog - 0.05, user.lastLog + 0.05 ),
        })
        return {
            status: "Success",
            error: null,
            drivers: nearbyDrivers
        }
    } catch (error) {
        return {
            status: "Fail",
            error: error.message,
            drivers: null
        }

    }

})

const resolvers: Resolvers = {
    Mutation: {
        getNearbyDrivers
    }
}

export default resolvers;