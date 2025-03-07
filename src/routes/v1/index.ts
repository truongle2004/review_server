import { Router } from 'express'
import { todoRouter } from './todo.route'
import { authRouter } from './auth.route'
import { commentRouter } from './comment.route'

const router = Router()

router.use('/todo', todoRouter)
router.use('/auth', authRouter)
router.use('/comment',commentRouter)
export const v1Router = router
