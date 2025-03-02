import { OutputBoundary } from '../../../shared/interfaces/OutputBoundary'
import { CreateCommentResponseData } from '../response/CreateCommentResponseData'

export class CreateCommentPresenter implements OutputBoundary {

  execute(data: CreateCommentResponseData): void {
    console.log(data)
    throw new Error('Method not implemented.')
  }
  getDataViewModel() {
    throw new Error('Method not implemented.')
  }
}