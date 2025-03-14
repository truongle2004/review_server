import { DeleteCommentInputDTO } from "../dtos/DeleteCommentDTO"

export class DeleteCommentRequestData {
    data: DeleteCommentInputDTO
    constructor(data: DeleteCommentInputDTO) {
        this.data = data
    }
}