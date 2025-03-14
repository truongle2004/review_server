import { LoginRequestData } from "../request/LoginRequestData";
import { RefreshTokenRequestData } from "../request/RefreshTokenRequestData";

export interface ILoginService {
    execute(data: LoginRequestData): void
    isValidEmail(email: string): boolean
    isValidPassword(password: string): boolean
    doRefreshToken(data: RefreshTokenRequestData): void 
}