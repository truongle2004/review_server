import { Router } from 'express'
import { CreateCommentController } from '../../modules/comment/controllers/CreateCommentController'
import { CreateCommentService } from '../../modules/comment/services/CreateCommentService'
import { CreateCommentDatabase } from '../../modules/comment/databases/CreateCommentDatabase'
import { CreateCommentPresenter } from '../../modules/comment/presenters/CreateCommentPresenter'

const router = Router()


const createCommentDatabase = new CreateCommentDatabase()
const createCommentPresenter = new CreateCommentPresenter()
const createCommentInputBoundary = new CreateCommentService(createCommentPresenter,createCommentDatabase)

const commentController = new CreateCommentController(createCommentInputBoundary,createCommentPresenter)

router.post("/", commentController.createComment)



export const commentRouter = router