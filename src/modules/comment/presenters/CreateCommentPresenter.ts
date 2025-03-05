import { OutputBoundary } from '../../../shared/interfaces/OutputBoundary'
import { CreateCommentResponseData } from '../response/CreateCommentResponseData'
import { CreateCommentViewModel } from '../ViewModel/CreateCommentViewModel'

export class CreateCommentPresenter implements OutputBoundary {
  data: CreateCommentViewModel;

  constructor() {
    this.data = new CreateCommentViewModel("", "");
  }
  execute(data: CreateCommentResponseData): void {
    if (data.status >= 200 && data.status < 399) {
      this.data.status = "true";
      this.data.message = data.message;
    }else{
      this.data.status = "false";
      this.data.message = data.message;
    }
  }
  getDataViewModel() {
    return this.data
  }
}