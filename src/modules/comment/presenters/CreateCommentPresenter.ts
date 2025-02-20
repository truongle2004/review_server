import { OutputBoundary } from '../../../shared/interfaces/OutputBoundary'
import { ResponseData } from '../../../shared/interfaces/ResponseData'
import {CreateCommentOutputDTO} from "../dtos/CreateCommentDTO";

export class CreateCommentPresenter implements OutputBoundary {

  execute(data: ResponseData<CreateCommentOutputDTO>): void {
    throw new Error('Method not implemented.')
  }
  getDataViewModel() {
    throw new Error('Method not implemented.')
  }
}