import { Router } from 'express'
import { CommentController } from '../../modules/comment/controllers/CommentController'
import { CommentService } from '../../modules/comment/services/CommentService'
import { CommentDatabase } from '../../modules/comment/databases/CommentDatabase'
import { CommentPresenter } from '../../modules/comment/presenters/CommentPresenter'
import {
  authMiddleware,
  userMiddleware
} from '../../modules/auth/authMiddleware'

const router = Router()

const commentDatabase = new CommentDatabase()
const commentPresenter = new CommentPresenter()
const commentService = new CommentService(commentPresenter, commentDatabase)
const commentController = new CommentController(
  commentService,
  commentPresenter
)

router.post(
  '/',
  authMiddleware,
  userMiddleware,
  CommentController.uploadImages,
  commentController.createComment
)

router.get('/:reviewId', commentController.getListCommentByReviewId)

router.put('/', authMiddleware, userMiddleware, commentController.updateComment)

router.delete(
  '/',
  authMiddleware,
  userMiddleware,
  commentController.deleteComment
)
export const commentRouter = router
