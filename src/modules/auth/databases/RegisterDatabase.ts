import { AppDataSource } from "../../../config/data-source";
import { Users } from "../../../entities/users.entity";
import { DatabaseBoundary } from "../interfaces/DatabaseBoundary";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class RegisterDatabase implements DatabaseBoundary{
    execute(data: Users): any {
       const userRepo = AppDataSource.getRepository(Users);
       const user = userRepo.create(data);
       return userRepo.save(user);
    }
}