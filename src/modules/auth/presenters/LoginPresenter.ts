import { LoginResponseData } from '../response/LoginResponseData'
import { ILoginPresenter } from "./ILoginPresenter";
import { RefreshTokenResponseData } from '../response/RefreshTokenResponseData';

export class LoginPresenter implements ILoginPresenter {

  private _dataViewModel!: LoginResponseData;
  private _refreshTokenViewModel!: RefreshTokenResponseData; 

  login(data: LoginResponseData): void {
    this._dataViewModel = data
  }
  getLoginViewModel(): LoginResponseData {
    return this._dataViewModel
  }

  doRefreshToken(data: RefreshTokenResponseData): void {
    this._refreshTokenViewModel = data
  }
  getRefreshTokenViewModel(): RefreshTokenResponseData {
    return this._refreshTokenViewModel
  }
}