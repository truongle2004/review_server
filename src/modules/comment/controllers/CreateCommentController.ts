import { InputBoundary } from '../../../shared/interfaces/InputBoundary'
import { OutputBoundary } from '../../../shared/interfaces/OutputBoundary'
import { Request , Response} from 'express'
import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { CreateCommentInputDTO, CreateCommentOutputDTO } from '../dtos/CreateCommentDTO'

export class CreateCommentController{
  createCommentInputBoundary: InputBoundary
  createCommentOutputBoundary: OutputBoundary

  constructor(createCommentInputBoundary: InputBoundary, createCommentOutputBoundary: OutputBoundary) {
    this.createCommentInputBoundary = createCommentInputBoundary
    this.createCommentOutputBoundary = createCommentOutputBoundary
  }

  createComment = async (req:Request<CreateCommentInputDTO>,res:Response<CreateCommentOutputDTO>) => {
    const { reviewId, content, userId, parentId } = req.body
    const dto = new CreateCommentInputDTO(reviewId,userId,parentId,content)
    const inputData = new CreateCommentRequestData(dto)

    await this.createCommentInputBoundary.execute(inputData)

    await res.send(this.createCommentOutputBoundary.getDataViewModel())
    return
  }
}