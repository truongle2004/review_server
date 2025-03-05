import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { GetListCommentByReviewIdRequestData } from '../request/GetListCommentByReviewIdRequestData'

export interface ICommentService{
  create(data: CreateCommentRequestData): Promise<void>
  getListCommentByReviewId(data: GetListCommentByReviewIdRequestData): Promise<void>
}