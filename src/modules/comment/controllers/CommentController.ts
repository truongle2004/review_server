import { Request , Response} from 'express'
import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { CreateCommentInputDTO, CreateCommentOutputDTO } from '../dtos/CreateCommentDTO'
import { ICommentService } from '../services/ICommentService'
import { GetListCommentByReviewIdInputDTO, GetListCommentByReviewIdOutputDTO } from '../dtos/GetListCommentByReviewIdDTO'
import { GetListCommentByReviewIdRequestData } from '../request/GetListCommentByReviewIdRequestData'
import { ICommentPresenter } from '../presenters/ICommentPresenter'
import { UpdateCommentInputDTO, UpdateCommentOutputDTO } from '../dtos/UpdateCommentDTO'
import { UpdateCommentRequestData } from '../request/UpdateCommentRequestData'

export class CommentController {
  commentService: ICommentService
  commentPresenter:ICommentPresenter

  constructor(createCommentInputBoundary: ICommentService, createCommentOutputBoundary: ICommentPresenter) {
    this.commentService = createCommentInputBoundary
    this.commentPresenter = createCommentOutputBoundary
  }

  createComment = async (req:Request<CreateCommentInputDTO>,res:Response<CreateCommentOutputDTO>) => {
    const { reviewId, content, parentId } = req.body
    const {userId} = req.user
    const dto = new CreateCommentInputDTO(reviewId,userId,parentId,content)
    const inputData = new CreateCommentRequestData(dto)
    await this.commentService.create(inputData)
    const viewModel = this.commentPresenter.getCreateCommentViewModel()
    res.status(viewModel.status).send(viewModel)
    return
  }

  getListCommentByReviewId = async (req:Request<GetListCommentByReviewIdInputDTO>,res:Response<GetListCommentByReviewIdOutputDTO>) => {
    const { reviewId } = req.params
    const dto = new GetListCommentByReviewIdInputDTO(reviewId)
    const reqData = new GetListCommentByReviewIdRequestData(dto)
    await this.commentService.getListCommentByReviewId(reqData)
    const viewModel = this.commentPresenter.getListCommentByReviewIdViewModel()
    res.status(viewModel.status).send(viewModel)
    return
  }

  updateComment = async (req: Request<UpdateCommentInputDTO>, res: Response<UpdateCommentOutputDTO>) => {
      const { commentId, reviewId, content } = req.body
      const {userId} = req.user
      const dto =  new UpdateCommentInputDTO( userId, reviewId,commentId, content)
      const reqData = new UpdateCommentRequestData(dto)
      await this.commentService.update(reqData)
      const viewModel = this.commentPresenter.getUpdateCommentViewModel()
      res.status(viewModel.status).send(viewModel)
    return
  }

}