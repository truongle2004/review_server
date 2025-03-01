/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOutputDTO } from "../dtos/RegisterDTO";
import { OutputBoundary } from "../../../shared/interfaces/OutputBoundary";
import { ResponseData } from "../../../shared/interfaces/ResponseData";
import {RegisterViewModel} from "../view_model/RegisterViewModel";

export class RegisterPresenter implements OutputBoundary{
    private _registerViewModel!: RegisterViewModel;

    execute(data: ResponseData<RegisterOutputDTO>): void {
        this._registerViewModel = new RegisterViewModel(data.status >= 200 && data.status < 399 ? "true" : "false", data.message);
    }

    getDataViewModel(): any {
        return this._registerViewModel
    }
}