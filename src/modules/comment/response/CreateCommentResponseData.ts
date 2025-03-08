import { CreateCommentOutputDTO } from '../dtos/CreateCommentDTO'

export class CreateCommentResponseData  {
     status: number
     message: string
     data: CreateCommentOutputDTO

    constructor(status: number, message: string, data: CreateCommentOutputDTO) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}