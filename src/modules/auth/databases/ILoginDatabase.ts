import { Users } from "../../../entities/users.entity"

export interface ILoginDatase{
    execute(data: Users): Promise<void>
    findAccountByEmail(email:string):Promise<Users>
}
