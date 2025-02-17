import { AppDataSource } from "../../../config/data-source";
import { Users } from "../../../entities/users.entity";
import { DatabaseBoundary } from "../interfaces/DatabaseBoundary";
export class FindAccountByEmailDatabase implements DatabaseBoundary {
    async execute(data: string): Promise<Users> {
        const userRepo = AppDataSource.getRepository(Users)
        const user = await userRepo.findOne({
            where: { email: data },
            select: ["email", "password", "roles"]
        });
        // @ts-ignore
        console.log(`::User :::${user.roles}`)
        if (!user) {
            throw new Error("User not found");
        }else {
            return user;
        }
    }
}