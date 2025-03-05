/* eslint-disable @typescript-eslint/no-explicit-any */
import { OutputBoundary } from "../../../shared/interfaces/OutputBoundary";
import { FindAccountByEmailViewModel } from "../view_model/FindAccountByEmailViewModel";
import { FindAccountByEmailResponseData } from '../response/FindAccountByEmailResponseData'

export class FindAccountByEmailPresenter implements OutputBoundary{

    private _dataViewModel: FindAccountByEmailViewModel | null = null

    execute(data2: FindAccountByEmailResponseData): void {
        // ts-ignore
        const {status, message, data} = data2
        this._dataViewModel = new FindAccountByEmailViewModel(status>=200 && status<399? "Success" : "Fail"
            ,message,data.username,data.email,data.password,data.roles);
        console.log("DataViewModelFindAccoutn::: "+JSON.stringify(this._dataViewModel))
        return
    }

    getDataViewModel(): any {
        return this._dataViewModel
    }
}