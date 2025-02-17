/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindAccountOutputDTO } from "../dtos/FindAccountDTO";
import { OutputBoundary } from "../interfaces/OutputBoundary";
import { ResponseData } from "../interfaces/ResponseData";
import { FindAccountByEmailViewModel } from "../view_model/FindAccountByEmailViewModel";

export class FindAccountByEmailPresenter implements OutputBoundary{

    private _dataViewModel: FindAccountByEmailViewModel | null = null

    execute(data2: ResponseData<FindAccountOutputDTO>): void {
        // ts-ignore
        const {status, message, data} = data2
        this._dataViewModel = new FindAccountByEmailViewModel(status>=200 && status<399? "Success" : "Fail"
            ,message,data.email,data.password,data._roles);
        console.log("DataViewModelFindAccoutn::: "+JSON.stringify(this._dataViewModel))
        return
    }

    getDataViewModel(): any {
        return this._dataViewModel
    }
}