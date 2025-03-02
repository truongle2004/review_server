import { bcryptConfig } from "../config/bcryptConfig";
import bcryptjs from "bcryptjs";
export const hashPassword = async (password:string) =>{
    return bcryptjs.hashSync(password, bcryptConfig.saltRounds);
}

export const comparePassword = async (password:string, hashedPassword:string) => {
    return bcryptjs.compareSync(password, hashedPassword);
}
