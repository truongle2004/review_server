import { GetListCommentByReviewIdOutputDTO } from '../dtos/GetListCommentByReviewIdDTO'

export class GetListCommentByReviewIdResponseData{
  status: number
  message: string
  data:GetListCommentByReviewIdOutputDTO[]

  constructor(status: number, message: string, data: GetListCommentByReviewIdOutputDTO[]) {
    this.status = status
    this.message = message
    this.data = data
  }

}