import {RequestData} from "../../../shared/interfaces/RequestData";
import {CreateCommentInputDTO} from "../dtos/CreateCommentDTO";

export class CreateCommentRequestData implements RequestData<CreateCommentInputDTO> {
    private _data: CreateCommentInputDTO;

    constructor(data: CreateCommentInputDTO) {
        this._data = data;
    }

    get data(): CreateCommentInputDTO {
        return this._data;
    }

    set data(value: CreateCommentInputDTO) {
        this._data = value;
    }
}