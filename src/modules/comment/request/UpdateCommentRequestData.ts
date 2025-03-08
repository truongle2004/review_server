import { UpdateCommentInputDTO } from "../dtos/UpdateCommentDTO";

export class UpdateCommentRequestData{
    data:UpdateCommentInputDTO 
    constructor(data:UpdateCommentInputDTO){
        this.data = data
    }
}