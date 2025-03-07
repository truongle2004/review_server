import { AppDataSource } from "../../../config/data-source";
import { Users } from "../../../entities/users.entity";
import { IRegisterDatabase } from "./IRegisterDatabase";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class RegisterDatabase implements IRegisterDatabase {
    execute(data: Users): any {
        const userRepo = AppDataSource.getRepository(Users);
        const user = userRepo.create(data);
        return userRepo.save(user);
    }
    async findAccountByEmail(email: string): Promise<any> {
        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.findOne({ where: { email: email } });
        if (user){
            throw new Error("User already exists");
        }
        return 
    }
}