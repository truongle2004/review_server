import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { CategoryController } from '../../modules/product/controllers/category.controller'
import { categoryValidation } from '../../validations/category.validation'
import {
  adminMiddleware,
  authMiddleware
} from '../../modules/auth/authMiddleware'

const router = Router()

const categoryController = container.resolve(CategoryController)

router
  .route('/')
  .post(
    authMiddleware,
    adminMiddleware,
    categoryValidation.addCategory,
    categoryController.addCategory
  )

router.route('/').get(categoryController.getAllCategories)

router
  .route('/:id')
  .delete(authMiddleware, adminMiddleware, categoryController.deleteCategory)

export const categoryRoute = router
