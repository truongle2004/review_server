import { Router } from 'express'
import { ProductController } from '../../modules/product/controllers/product.controller'
import { container } from 'tsyringe'
import 'reflect-metadata'
import { productValidation } from '../../validations/product.validation'
import {
  adminMiddleware,
  authMiddleware
} from '../../modules/auth/authMiddleware'

const router = Router()

const productController = container.resolve(ProductController)

// router
//   .route('/')
//   .get(productValidation.getProduct, productController.getProducts)

router
  .route('/')
  .post(authMiddleware, adminMiddleware, productController.createProduct)

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
  .delete(
    productValidation.deleteProduct,
    authMiddleware,
    adminMiddleware,
    productController.deleteProductById
  )

export const productRoute = router
