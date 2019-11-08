import User from '../../../entities/User';
import { EmailSignUpInput, EmailSignUpResponse } from './../../../types/graph.d';
import { Resolvers } from './../../../types/resolvers.d';

const emailSignUp = async (_, args:EmailSignUpInput): Promise<EmailSignUpResponse> => {
    const { email } = args
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return {
                status: "Fail",
                error: "Account Already Exit Login Instead",
                token: null
            }
        }else{
            const newUser = await User.create({...args})
            return {
                status: "Success",
                error: null,
                token: "coming Soon"
            }
        }

    } catch (error) {
       return {
           status: "Fail",
           error: error.message,
           token: null
       }
    }
}

const resolvers: Resolvers = {
    Mutation :{
        emailSignUp
    }
}


export default resolvers