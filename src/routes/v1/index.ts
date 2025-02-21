import { Router } from 'express'
import { todoRouter } from './todo.route'
import { productRoute } from './product.route'
import { categoryRoute } from './category.route'

const router = Router()

router.use('/todo', todoRouter)

router.use('/product', productRoute)

router.use('/category', categoryRoute)

export const v1Router = router
