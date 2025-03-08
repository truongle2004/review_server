import { GetListCommentByReviewIdInputDTO } from '../dtos/GetListCommentByReviewIdDTO'

export class GetListCommentByReviewIdRequestData{
  data:GetListCommentByReviewIdInputDTO

  constructor(data: GetListCommentByReviewIdInputDTO) {
    this.data = data
  }
}