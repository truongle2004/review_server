import { Router } from 'express'
import { todoRouter } from './todo.route'
import { authRouter } from './auth.route'
import { reviewRoute } from './review.route'
import { commentRouter } from './comment.route'
import { productRoute } from './product.route'
import { categoryRoute } from './category.route'

const router = Router()

router.use('/todo', todoRouter)

router.use('/review', reviewRoute)

router.use('/product', productRoute)

router.use('/category', categoryRoute)

router.use('/auth', authRouter)

router.use('/comment',commentRouter)

export const v1Router = router
