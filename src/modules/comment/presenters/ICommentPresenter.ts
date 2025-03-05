import { GetListCommentByReviewIdResponseData } from '../response/GetListCommentByReviewIdResponseData'
import { CreateCommentResponseData } from '../response/CreateCommentResponseData'

export interface ICommentPresenter{
  createCommentPresenter(data: CreateCommentResponseData):void;
  getCreateCommentViewModel():any;
  getListCommentByReviewIdPresenter(data: GetListCommentByReviewIdResponseData):void
  getListCommentByReviewIdViewModel():any;
}