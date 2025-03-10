import { Router } from 'express'
import { todoRouter } from './todo.route'
import { authRouter } from './auth.route'
import { reviewRoute } from './review.route'
import { commentRouter } from './comment.route'
import {
  authMiddleware,
  userMiddleware
} from '../../modules/auth/authMiddleware'
import { productRoute } from './product.route'
import { categoryRoute } from './category.route'

const router = Router()

router.use('/todo', todoRouter)

router.use('/review', reviewRoute)

router.use('/product', productRoute)

router.use('/category', categoryRoute)

router.use('/auth', authRouter)
// router.use('/comment', authMiddleware, userMiddleware, commentRouter)
export const v1Router = router
