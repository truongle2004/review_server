import { CreateCommentResponseData } from '../response/CreateCommentResponseData'
import { ICommentPresenter } from './ICommentPresenter'
import { GetListCommentByReviewIdResponseData } from '../response/GetListCommentByReviewIdResponseData'
import { UpdateCommentResponseData } from '../response/UpdateCommnetResponseData'

export class CommentPresenter implements ICommentPresenter {
  createCommentViewModel: CreateCommentResponseData 
  getListCommentViewModel: GetListCommentByReviewIdResponseData 
  updateCommentViewModetl:  UpdateCommentResponseData 
  createCommentPresenter(data: CreateCommentResponseData): void {
    this.createCommentViewModel = data
  }
  getCreateCommentViewModel() {
    return this.createCommentViewModel
  }

  getListCommentByReviewIdPresenter(
    data: GetListCommentByReviewIdResponseData
  ): void {
    this.getListCommentViewModel = data
  }
  getListCommentByReviewIdViewModel() {
    return this.getListCommentViewModel
  }

  updateCommentPresenter(data: CreateCommentResponseData): void {
    this.updateCommentViewModetl=data
  } 

  getUpdateCommentViewModel() {
    return this.updateCommentViewModetl
  }

}
