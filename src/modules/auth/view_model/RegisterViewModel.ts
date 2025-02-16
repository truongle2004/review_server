export class RegisterViewModel{
    private _isSuccess: string
    private _message: string

    constructor(isSuccess: string, message: string) {
        this._isSuccess = isSuccess;
        this._message = message;
    }

    get isSuccess(): string {
        return this._isSuccess;
    }

    set isSuccess(value: string) {
        this._isSuccess = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}