export interface ILoginDatase{
    execute(data: any): Promise<any>
    findAccountByEmail(email:string):Promise<any>
}
