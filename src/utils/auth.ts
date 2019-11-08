import jwt from 'jsonwebtoken';
import User from '../entities/User';

const createToken = (userId:string): string => {
  const token = jwt.sign({ id : userId}, process.env.JWT_KEY || "")
  return token;
};


const verifyToken = async (token:string): Promise<User | undefined > => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "")
    const { id } = decoded;
    const user = await User.findOne({ id })
    return user;

  } catch (error) {
   return undefined;
  }

}
export { createToken, verifyToken } ;

