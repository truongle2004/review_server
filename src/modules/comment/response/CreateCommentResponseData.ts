import {RequestData} from "../../../shared/interfaces/RequestData";
import {CreateCommentOutputDTO} from "../dtos/CreateCommentDTO";

export class CreateCommentRequestData implements RequestData<CreateCommentOutputDTO> {
    private _status: number
    private _message: string
    private _data: CreateCommentOutputDTO

    constructor(status: number, message: string, data: CreateCommentOutputDTO) {
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

    get data(): CreateCommentOutputDTO {
        return this._data;
    }

    set data(value: CreateCommentOutputDTO) {
        this._data = value;
    }
}