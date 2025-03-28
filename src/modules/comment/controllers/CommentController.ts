import { Request, Response } from 'express'
import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { CreateCommentInputDTO } from '../dtos/CreateCommentDTO'
import { ICommentService } from '../services/ICommentService'
import { GetListCommentByReviewIdInputDTO } from '../dtos/GetListCommentByReviewIdDTO'
import { GetListCommentByReviewIdRequestData } from '../request/GetListCommentByReviewIdRequestData'
import { ICommentPresenter } from '../presenters/ICommentPresenter'
import { UpdateCommentInputDTO } from '../dtos/UpdateCommentDTO'
import { UpdateCommentRequestData } from '../request/UpdateCommentRequestData'
import { CreateCommentResponseData } from '../response/CreateCommentResponseData'
import { JwtPayload } from 'jsonwebtoken'
import { UpdateCommentResponseData } from '../response/UpdateCommnetResponseData'
import { GetListCommentByReviewIdResponseData } from '../response/GetListCommentByReviewIdResponseData'
import { DeleteCommentInputDTO } from '../dtos/DeleteCommentDTO'
import { DeleteCommentResponseData } from '../response/DeleteCommentResponseData'
import { DeleteCommentRequestData } from '../request/DeleteCommentRequestData'
import multer from 'multer'
import path from 'path'

// Cấu hình Multer để lưu ảnh vào thư mục uploads/comments/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/comments/') // Thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // Đổi tên file để tránh trùng
  }
})

const upload = multer({ storage: storage })

export class CommentController {
  commentService: ICommentService
  commentPresenter: ICommentPresenter

  static uploadImages = upload.array('images', 5)

  constructor(
    createCommentInputBoundary: ICommentService,
    createCommentOutputBoundary: ICommentPresenter
  ) {
    this.commentService = createCommentInputBoundary
    this.commentPresenter = createCommentOutputBoundary
  }

  createComment = async (
    req: Request<object, object, CreateCommentInputDTO, object>,
    res: Response<CreateCommentResponseData>
  ) => {
    // console.log('Body nhận được:', req.body) // 📌 Log để kiểm tra
    // console.log('Files nhận được:', req.files) // 📌 Log danh sách ảnh

    const { reviewId, content, parentId } = req.body

    // Lấy danh sách đường dẫn ảnh đã upload
    const images = req.files
      ? (req.files as Express.Multer.File[]).map((file) => file.path.replace(/\\/g, '/'))
      : []

    images.forEach((image) => {
      console.log(image)
    })

    const { userId } = req.user as JwtPayload & { userId: string }
    const dto = new CreateCommentInputDTO(
      reviewId,
      userId,
      parentId,
      content,
      images
    )

    const inputData = new CreateCommentRequestData(dto)
    await this.commentService.create(inputData)
    const viewModel = this.commentPresenter.getCreateCommentViewModel()
    res.status(viewModel.status).send(viewModel)
    return
  }

  getListCommentByReviewId = async (
    req: Request<GetListCommentByReviewIdInputDTO>,
    res: Response<GetListCommentByReviewIdResponseData>
  ) => {
    const { reviewId } = req.params
    const dto = new GetListCommentByReviewIdInputDTO(reviewId)
    const reqData = new GetListCommentByReviewIdRequestData(dto)
    await this.commentService.getListCommentByReviewId(reqData)
    const viewModel = this.commentPresenter.getListCommentByReviewIdViewModel()
    res.status(viewModel.status).send(viewModel)
    return
  }

  updateComment = async (
    req: Request<object, object, UpdateCommentInputDTO, object>,
    res: Response<UpdateCommentResponseData>
  ) => {
    const { commentId, reviewId, content } = req.body
    const { userId } = req.user as JwtPayload & { userId: string }
    const dto = new UpdateCommentInputDTO(userId, reviewId, commentId, content)
    const reqData = new UpdateCommentRequestData(dto)
    await this.commentService.update(reqData)
    const viewModel = this.commentPresenter.getUpdateCommentViewModel()
    res.status(viewModel.status).send(viewModel)
    return
  }

  deleteComment = async (
    req: Request<object, object, DeleteCommentInputDTO, object>,
    res: Response<DeleteCommentResponseData>
  ) => {
    const { reviewId, parentId, commentId } = req.body
    const { userId } = req.user as JwtPayload & { userId: string }
    const dto = new DeleteCommentInputDTO(reviewId, parentId, commentId, userId)
    const reqData = new DeleteCommentRequestData(dto)
    await this.commentService.delete(reqData)
    const viewModel = this.commentPresenter.getDeleteCommentViewModel()
    res.status(viewModel.status).send(viewModel)
    return
  }
}
