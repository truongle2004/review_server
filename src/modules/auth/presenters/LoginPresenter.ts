import { LoginResponseData } from '../response/LoginResponseData'
import { ILoginPresenter } from "./ILoginPresenter";

export class LoginPresenter implements ILoginPresenter {
  private _dataViewModel!: LoginResponseData;

  execute(data2: LoginResponseData): void {
    this._dataViewModel = data2
  }

  getData() {
    return this._dataViewModel
  }
}