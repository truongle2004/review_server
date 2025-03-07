
export interface IRegisterDatabase {
    execute(data: any): Promise<any>
    findAccountByEmail(email:string):Promise<any>
} 