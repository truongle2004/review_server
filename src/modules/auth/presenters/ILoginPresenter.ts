import { LoginResponseData } from "../response/LoginResponseData"
import { RefreshTokenResponseData } from "../response/RefreshTokenResponseData"

export interface ILoginPresenter{
    login(data: LoginResponseData): void 
    getLoginViewModel(): LoginResponseData
    doRefreshToken(data: RefreshTokenResponseData): void
    getRefreshTokenViewModel(): RefreshTokenResponseData
}