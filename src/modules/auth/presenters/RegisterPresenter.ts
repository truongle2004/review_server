import { RegisterResponseData } from '../response/RegisterResponseData'
import { IRegisterPresenter } from "./IRegisterPresenter";

export class RegisterPresenter implements IRegisterPresenter{
    registerViewModel: RegisterResponseData;

    constructor() {
        this.registerViewModel = new RegisterResponseData()
    }
    execute(data: RegisterResponseData): void {
        this.registerViewModel = data
    }

    getData() {
        return this.registerViewModel
    }
}