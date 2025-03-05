import { CreateCommentResponseData } from '../response/CreateCommentResponseData'
import { CreateCommentViewModel } from '../ViewModel/CreateCommentViewModel'
import { ICommentPresenter } from './ICommentPresenter'
import { GetListCommentByReviewIdViewModel } from '../ViewModel/GetListCommentByReviewIdViewModel'
import { GetListCommentByReviewIdResponseData } from '../response/GetListCommentByReviewIdResponseData'

export class CommentPresenter implements ICommentPresenter {
  createCommentViewModel: CreateCommentViewModel
  getListCommentViewModel: GetListCommentByReviewIdViewModel
  constructor() {
    this.createCommentViewModel = new CreateCommentViewModel('', '')
    this.getListCommentViewModel = new GetListCommentByReviewIdViewModel('', '', [])
  }
  createCommentPresenter(data: CreateCommentResponseData): void {
    if (data.status >= 200 && data.status < 399) {
      this.createCommentViewModel.status = 'true'
      this.createCommentViewModel.message = data.message
    } else {
      this.createCommentViewModel.status = 'false'
      this.createCommentViewModel.message = data.message
    }
  }
  getCreateCommentViewModel() {
    return this.createCommentViewModel
  }

  getListCommentByReviewIdPresenter(
    data: GetListCommentByReviewIdResponseData
  ): void {
    if (data.status >= 200 && data.status < 399) {
      this.getListCommentViewModel.status = 'true'
      this.getListCommentViewModel.message = data.message
      this.getListCommentViewModel.comments = data.data.comments
    } else {
      this.getListCommentViewModel.status = 'false'
      this.getListCommentViewModel.message = data.message
      this.getListCommentViewModel.comments = []
    }
  }
  getListCommentByReviewIdViewModel() {
    return this.getListCommentViewModel
  }
}
