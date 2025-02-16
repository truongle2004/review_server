/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginOutputDTO } from "../dtos/LoginDTO";
import { OutputBoundary } from "../interfaces/OutputBoundary";
import { ResponseData } from "../interfaces/ResponseData";
import { LoginViewModel } from "../view_model/LoginViewModel";

export class LoginPresenter implements OutputBoundary {
  private _dataViewModel!: LoginViewModel;


  execute(data2: ResponseData<LoginOutputDTO>): void {
    // @ts-ignore
    const {status, message, data} = data2
      this._dataViewModel = new LoginViewModel(status >= 200 && status < 399 ? "true" : "false", message, data.getJwtCode());
  }

  getDataViewModel(): any {
  return this._dataViewModel
  }
}