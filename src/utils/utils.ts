import { hash, compare} from "bcryptjs" ;
import { bcryptConfig } from "../config/bcryptConfig";

export const hashPassword = async (password:string) =>{
    return await hash(password, bcryptConfig.saltRounds);
}

export const comparePassword = async (password:string, hashedPassword:string) => {
    return await compare(password, hashedPassword);
}
