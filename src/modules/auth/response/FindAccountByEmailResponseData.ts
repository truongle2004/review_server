import {FindAccountOutputDTO} from "../dtos/FindAccountDTO";

export class FindAccountByEmailResponseData  {
    private _status: number
    private _message: string
    private _data:FindAccountOutputDTO

    constructor(status: number, message: string, data: FindAccountOutputDTO) {
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


    get data(): FindAccountOutputDTO {
        return this._data;
    }

    set data(value: FindAccountOutputDTO) {
        this._data = value;
    }
}