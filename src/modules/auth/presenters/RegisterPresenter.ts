/* eslint-disable @typescript-eslint/no-explicit-any */
import { OutputBoundary } from "../../../shared/interfaces/OutputBoundary";
import {RegisterViewModel} from "../view_model/RegisterViewModel";
import { RegisterResponseData } from '../response/RegisterResponseData'

export class RegisterPresenter implements OutputBoundary{
    private _registerViewModel!: RegisterViewModel;

    execute(data: RegisterResponseData): void {
        this._registerViewModel = new RegisterViewModel(data.status >= 200 && data.status < 399 ? "true" : "false", data.message);
    }

    getDataViewModel(): any {
        return this._registerViewModel
    }
}