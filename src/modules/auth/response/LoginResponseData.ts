import {LoginOutputDTO} from "../dtos/LoginDTO";

export class LoginResponseData {

    private _status: number;
    private _message: string;
    private _data: LoginOutputDTO;

    constructor(status: number, message: string, data: LoginOutputDTO) {
        this._status = status;
        this._message = message;
        this._data = data;
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get data(): LoginOutputDTO {
        return this._data;
    }

    set data(value: LoginOutputDTO) {
        this._data = value;
    }
}