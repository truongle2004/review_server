import { UpdateCommentOutputDTO } from "../dtos/UpdateCommentDTO";

export class UpdateCommentResponseData{
    status: number;
    message: string;
    data: UpdateCommentOutputDTO 
    constructor(status: number, message: string, data: UpdateCommentOutputDTO){
        this.data = data
        this.message=message
        this.status=status
    }
    
}