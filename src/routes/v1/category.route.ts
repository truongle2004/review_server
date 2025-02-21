import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { CategoryController } from '../../modules/product/controllers/category.controller'

const router = Router()

const categoryController = container.resolve(CategoryController)

router.route('/').post(categoryController.addCategory)

router.route('/').get(categoryController.getAllCategories)

export const categoryRoute = router
