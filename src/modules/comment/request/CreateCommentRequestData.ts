import {CreateCommentInputDTO} from "../dtos/CreateCommentDTO";

export class CreateCommentRequestData {
     data: CreateCommentInputDTO;

    constructor(data: CreateCommentInputDTO) {
        this.data = data;
    }

}