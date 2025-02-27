import { Router } from 'express'
import { ProductController } from '../../modules/product/controllers/product.controller'
import { container } from 'tsyringe'
import 'reflect-metadata'
import { productValidation } from '../../validations/product.validation'

const router = Router()

const productController = container.resolve(ProductController)

router
  .route('/')
  .get(productValidation.getProduct, productController.getProducts)

router
  .route('/:id')
  .get(productValidation.getProductById, productController.getProductById)

router
  .route('/category/:id')
  .get(
    productValidation.getProductByCategory,
    productController.getProductPagination
  )

router
  .route('/:id')
  .delete(productValidation.deleteProduct, productController.deleteProductById)

export const productRoute = router
