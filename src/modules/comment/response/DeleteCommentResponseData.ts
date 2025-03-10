import { DeleteCommentOutputDTO } from '../dtos/DeleteCommentDTO'

export class DeleteCommentResponseData {
  status: number
  message: string
  data: DeleteCommentOutputDTO
  constructor(status: number, message: string, data: DeleteCommentOutputDTO) {
    this.status = status
    this.message = message
    this.data = data
  }
}
