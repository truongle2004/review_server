import {RegisterOutputDTO} from "../dtos/RegisterDTO";

export class RegisterResponseData {
    private _status: number;
    private _message: string;
    private _data: RegisterOutputDTO;
    constructor(status: number, message: string, data: RegisterOutputDTO) {
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

    get data(): RegisterOutputDTO {
        return this._data;
    }

    set data(value: RegisterOutputDTO) {
        this._data = value;
    }
}