import { Router } from 'express'
import { todoRouter } from './todo.route'
import { productRoute } from './product.route'

const router = Router()

router.use('/todo', todoRouter)

router.use('/product', productRoute)

export const v1Router = router
