import { CreateCommentResponseData } from '../response/CreateCommentResponseData'
import { ICommentPresenter } from './ICommentPresenter'
import { GetListCommentByReviewIdResponseData } from '../response/GetListCommentByReviewIdResponseData'
import { UpdateCommentResponseData } from '../response/UpdateCommnetResponseData'
import { DeleteCommentResponseData } from '../response/DeleteCommentResponseData'

export class CommentPresenter implements ICommentPresenter {
  createCommentViewModel!: CreateCommentResponseData 
  getListCommentViewModel!: GetListCommentByReviewIdResponseData
  updateCommentViewModetl!:  UpdateCommentResponseData 
  deleteCommentViewModetl!: DeleteCommentResponseData 

  createCommentPresenter(data: CreateCommentResponseData): void {
    this.createCommentViewModel = data
  }
  getCreateCommentViewModel() {
    return this.createCommentViewModel
  }

  getListCommentByReviewIdPresenter(
    data2: GetListCommentByReviewIdResponseData
  ): void {
    this.getListCommentViewModel = data2
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
  deleteCommentPresenter(data: DeleteCommentResponseData): void {
    this.deleteCommentViewModetl=data
  }

  getDeleteCommentViewModel(): UpdateCommentResponseData {
    return this.deleteCommentViewModetl
  }
}
