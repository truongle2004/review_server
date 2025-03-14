import { RegisterResponseData } from "../response/RegisterResponseData"

export interface IRegisterPresenter{
    execute(data: RegisterResponseData): void
    getData():RegisterResponseData
}