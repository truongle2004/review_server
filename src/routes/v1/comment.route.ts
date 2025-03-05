import { Router } from 'express'
import { CommentController } from '../../modules/comment/controllers/CommentController'
import { CommentService } from '../../modules/comment/services/CommentService'
import { CommentDatabase } from '../../modules/comment/databases/CommentDatabase'
import { CommentPresenter } from '../../modules/comment/presenters/CommentPresenter'

const router = Router()


const commentDatabase = new CommentDatabase()
const createCommentPresenter = new CommentPresenter()
const commentService = new CommentService(createCommentPresenter,commentDatabase)
const commentController = new CommentController(commentService,createCommentPresenter)

router.post("/", commentController.createComment)
router.get("/:reviewId",commentController.getListCommentByReviewId)


export const commentRouter = router