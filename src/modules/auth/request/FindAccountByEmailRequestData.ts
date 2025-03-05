import {FindAccountInputDTO} from "../dtos/FindAccountDTO";

export class FindAccountByEmailRequestData {

    private _data: FindAccountInputDTO;

    constructor(data: FindAccountInputDTO) {
        this._data = data;
    }

    get data(): FindAccountInputDTO {
        return this._data;
    }

    set data(value: FindAccountInputDTO) {
        this._data = value;
    }
}