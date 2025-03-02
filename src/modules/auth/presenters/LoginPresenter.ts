/* eslint-disable @typescript-eslint/no-explicit-any */
import { OutputBoundary } from "../../../shared/interfaces/OutputBoundary";
import { LoginViewModel } from "../view_model/LoginViewModel";
import { LoginResponseData } from '../response/LoginResponseData'

export class LoginPresenter implements OutputBoundary {
  private _dataViewModel!: LoginViewModel;


  execute(data2: LoginResponseData): void {
    const {status, message, data} = data2
      this._dataViewModel = new LoginViewModel(status >= 200 && status < 399 ? "true" : "false", message, data.getJwtCode());
  }

  getDataViewModel(): any {
  return this._dataViewModel
  }
}