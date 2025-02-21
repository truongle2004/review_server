import { Router } from 'express'
import { ProductController } from '../../modules/product/controllers/product.controller'
import { container } from 'tsyringe'
import 'reflect-metadata'

const router = Router()

const productController = container.resolve(ProductController)

router.route('/').get(productController.getProducts)

router.route('/:id').get(productController.getProductById)

export const productRoute = router
