import { Router } from 'express'
import { todoRouter } from './todo.route'
import { productRoute } from './product.route'
import { categoryRoute } from './category.route'
import { authRouter } from './auth.route'
import { reviewRoute } from './review.route'

const router = Router()

router.use('/todo', todoRouter)

router.use('/review', reviewRoute)

router.use('/product', productRoute)

router.use('/category', categoryRoute)

router.use('/auth', authRouter)

export const v1Router = router
