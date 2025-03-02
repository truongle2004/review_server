import {LoginInputDTO} from "../dtos/LoginDTO";

export class LoginRequestData  {

    private _data: LoginInputDTO;

    constructor(data: LoginInputDTO) {
        this._data = data;
    }

    get data(): LoginInputDTO {
        return this._data;
    }

    set data(value: LoginInputDTO) {
        this._data = value;
    }
}