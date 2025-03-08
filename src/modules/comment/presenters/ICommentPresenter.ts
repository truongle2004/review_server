import { GetListCommentByReviewIdResponseData } from '../response/GetListCommentByReviewIdResponseData'
import { CreateCommentResponseData } from '../response/CreateCommentResponseData'
import { UpdateCommentResponseData } from '../response/UpdateCommnetResponseData';

export interface ICommentPresenter{
  createCommentPresenter(data: CreateCommentResponseData):void;
  getCreateCommentViewModel():CreateCommentResponseData;
  getListCommentByReviewIdPresenter(data: GetListCommentByReviewIdResponseData):void
  getListCommentByReviewIdViewModel():GetListCommentByReviewIdResponseData;
  updateCommentPresenter(data: CreateCommentResponseData):void
  getUpdateCommentViewModel():UpdateCommentResponseData
}