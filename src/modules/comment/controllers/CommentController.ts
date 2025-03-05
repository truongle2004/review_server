import { OutputBoundary } from '../../../shared/interfaces/OutputBoundary'
import { Request , Response} from 'express'
import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { CreateCommentInputDTO, CreateCommentOutputDTO } from '../dtos/CreateCommentDTO'
import { ICommentService } from '../services/ICommentService'
import { GetListCommentByReviewIdInputDTO } from '../dtos/GetListCommentByReviewIdDTO'
import { GetListCommentByReviewIdRequestData } from '../request/GetListCommentByReviewIdRequestData'
import { ICommentPresenter } from '../presenters/ICommentPresenter'

export class CommentController {
  commentService: ICommentService
  commentPresenter:ICommentPresenter

  constructor(createCommentInputBoundary: ICommentService, createCommentOutputBoundary: ICommentPresenter) {
    this.commentService = createCommentInputBoundary
    this.commentPresenter = createCommentOutputBoundary
  }

  createComment = async (req:Request<CreateCommentInputDTO>,res:Response<CreateCommentOutputDTO>) => {
    const { reviewId, content, parentId } = req.body
    // @ts-ignore
    const {userId} = req.user?.userId
    const dto = new CreateCommentInputDTO(reviewId,userId,parentId,content)
    const inputData = new CreateCommentRequestData(dto)
    await this.commentService.create(inputData)
    await res.send(this.commentPresenter.getCreateCommentViewModel())
    return
  }

  getListCommentByReviewId = async (req:Request<GetListCommentByReviewIdInputDTO>,res:Response) => {
    const { reviewId } = req.params
    const dto = new GetListCommentByReviewIdInputDTO(reviewId)
    const reqData = new GetListCommentByReviewIdRequestData(dto)
    await this.commentService.getListCommentByReviewId(reqData)
    await res.send(this.commentPresenter.getListCommentByReviewIdViewModel())
    return
  }
}