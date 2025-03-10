import { AppDataSource } from "../../../config/data-source";
import { Users } from "../../../entities/users.entity";
import { IRegisterDatabase } from "./IRegisterDatabase";
export class RegisterDatabase implements IRegisterDatabase {
    async execute(data: Users): Promise<Users> {
        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.create(data);
        return await userRepo.save(user);
    }
    async findAccountByEmail(email: string): Promise<Users|null> {
        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.findOne({ where: { email: email } });
        if (user){
            throw new Error("User already exists");
        }
        return null
    }
}