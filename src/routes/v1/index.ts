import { Router } from 'express'
import { todoRouter } from './todo.route'
import { authRouter } from './auth.route'

const router = Router()

router.use('/todo', todoRouter)
router.use('/auth', authRouter)
export const v1Router = router
