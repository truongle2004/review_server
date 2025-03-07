import { LoginRequestData } from "../request/LoginRequestData";

export interface ILoginService {
    execute(data: LoginRequestData): void
    isValidEmail(email: string): boolean
    isValidPassword(password: string): boolean

}