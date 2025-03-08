import { Users } from "../../../entities/users.entity"

export interface IRegisterDatabase {
    execute(data: Users ): Promise<Users>
    findAccountByEmail(email:string):Promise<Users|null>
} 