import {RegisterInputDTO} from "../dtos/RegisterDTO";

export class RegisterRequestData  {
    private _data: RegisterInputDTO;

    constructor(data: RegisterInputDTO) {
        this._data = data;
    }

    get data(): RegisterInputDTO {
        return this._data;
    }

    set data(value: RegisterInputDTO) {
        this._data = value;
    }
}