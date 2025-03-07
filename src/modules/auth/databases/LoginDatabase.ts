import { AppDataSource } from "../../../config/data-source";
import { Users } from "../../../entities/users.entity";
import { ILoginDatase } from "./ILoginDatabase";

/* eslint-disable @typescript-eslint/no-unused-vars */
export class LoginDatabase implements ILoginDatase {
    execute(data: Users): Promise<void> {
        return Promise.resolve(undefined);
    }
 async findAccountByEmail(email: string): Promise<any> {
        const userRepo = AppDataSource.getRepository(Users);
        return await userRepo.findOne({ where: { email: email } });
    }
}