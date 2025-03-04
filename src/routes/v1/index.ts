import { Router } from 'express'
import { todoRouter } from './todo.route'
import { authRouter } from './auth.route'
import { commentRouter } from './comment.route'
import { authMiddleware, userMiddleware } from '../../modules/auth/authMiddleware'

const router = Router()

router.use('/todo', todoRouter)
router.use('/auth', authRouter)
router.use('/comment',authMiddleware,userMiddleware,commentRouter)
export const v1Router = router
