import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { DeleteCommentRequestData } from '../request/DeleteCommentRequestData'
import { GetListCommentByReviewIdRequestData } from '../request/GetListCommentByReviewIdRequestData'
import { UpdateCommentRequestData } from '../request/UpdateCommentRequestData'

export interface ICommentService{
  create(data: CreateCommentRequestData): Promise<void>
  getListCommentByReviewId(data: GetListCommentByReviewIdRequestData): Promise<void>
  update(data: UpdateCommentRequestData): Promise<void>
  delete(data: DeleteCommentRequestData): Promise<void>
}