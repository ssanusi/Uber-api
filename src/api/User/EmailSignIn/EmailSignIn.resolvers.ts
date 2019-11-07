import User from '../../../entities/User';
import { EmailSignInInput, EmailSignInResponse } from './../../../types/graph.d';
import { Resolvers } from './../../../types/resolvers.d';

const emailSignIn = async(_, args:EmailSignInInput): Promise<EmailSignInResponse> => {
    const { email, password } = args
    try {
        const user = await User.findOne({ email })
        if(!user){
            return{
                status: "Fail",
                error: "No User Found with email",
                token: null
            }
        }

        const checkPassword =  await user.comparePassword(password);

        if(checkPassword) {
            return {
                status: "Ok",
                error: null,
                token: "Coming soon"
            }
        }
        else{
            return{
               status: "Fail",
               error: "Invalid Credential",
               token: null
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
        emailSignIn
    }
}


export default resolvers