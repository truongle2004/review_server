import { Router } from 'express'
import { todoRouter } from './todo.route'
import { authRouter } from './auth.route'
import { reviewRoute } from './review.route'
import { commentRouter } from './comment.route'
import { productRoute } from './product.route'
import { categoryRoute } from './category.route'
import { profileRouter } from './profile.route'
import { ratingRoute } from './rating.route'

const router = Router()

router.use('/todo', todoRouter)

router.use('/review', reviewRoute)

router.use('/rating', ratingRoute)

router.use('/product', productRoute)

router.use('/category', categoryRoute)

router.use('/auth', authRouter)

router.use('/comment', commentRouter)

router.use('/profile', profileRouter)

export const v1Router = router
