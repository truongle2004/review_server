import { RegisterResponseData } from '../response/RegisterResponseData'
import { IRegisterPresenter } from "./IRegisterPresenter";

export class RegisterPresenter implements IRegisterPresenter{
    private registerViewModel!: RegisterResponseData;

    execute(data: RegisterResponseData): void {
        this.registerViewModel = data
    }

    getData(): RegisterResponseData {
        return this.registerViewModel
    }
}