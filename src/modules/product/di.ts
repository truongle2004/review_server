import 'reflect-metadata'
import { container } from 'tsyringe'
import { ProductController } from './controllers/product.controller'
import { IAddCategoryRepository } from './repositories/addCategory.repository.interface'
import { IGetAllCategoriesRepository } from './repositories/getAllCategories.repository.interface'
import { IProductRepository } from './repositories/getAllProduct.repository.interface'
import { IGetProductByIdRepository } from './repositories/getProductById.repository.interface'
import { AddCategoryRepository } from './repositories/impl/addCategory.repository'
import { GetAllCategoriesRepository } from './repositories/impl/getAllCategories.repository'
import { ProductRepository } from './repositories/impl/getAllProduct.repository'
import { GetProductByIdRepository } from './repositories/impl/getProductById.repository'
import { IAddCategoryService } from './services/addCategory.service.interface'
import { IGetAllCategoriesService } from './services/getAllCategories.service.interface'
import { IGetProductService } from './services/getAllProduct.interface.service'
import { IGetProductByIdService } from './services/getProductById.service.interface'
import { AddCategoryService } from './services/impl/addCategory.service'
import { GetAllCategoriesService } from './services/impl/getAllCategories.service'
import { GetProductService } from './services/impl/getAllProduct.service'
import { GetProductByIdService } from './services/impl/getProductById.service'
import { IGetProductByCategoryRepository } from './repositories/getProductByCategory.repository.interface'
import { GetProductByCategoryRepository } from './repositories/impl/getProductByCategory.repository'
import { IGetProductByCategoryService } from './services/getProductByCategory.service.interface'
import { GetProductByCategoryService } from './services/impl/getProductByCategory.service'

container.register<IProductRepository>('IProductRepository', {
  useClass: ProductRepository
})

container.register<IGetProductService>('IGetProductService', {
  useClass: GetProductService
})

container.register<IGetProductByIdRepository>('IGetProductByIdRepository', {
  useClass: GetProductByIdRepository
})

container.register<IGetProductByIdService>('IGetProductByIdService', {
  useClass: GetProductByIdService
})

container.register<IGetAllCategoriesRepository>('IGetAllCategoriesRepository', {
  useClass: GetAllCategoriesRepository
})

container.register<IGetAllCategoriesService>('IGetAllCategoriesService', {
  useClass: GetAllCategoriesService
})

container.register<IAddCategoryRepository>('IAddCategoryRepository', {
  useClass: AddCategoryRepository
})

container.register<IAddCategoryService>('IAddCategoryService', {
  useClass: AddCategoryService
})

container.register<IGetProductByCategoryRepository>(
  'IGetProductByCategoryRepository',
  {
    useClass: GetProductByCategoryRepository
  }
)

container.register<IGetProductByCategoryService>(
  'IGetProductByCategoryService',
  {
    useClass: GetProductByCategoryService
  }
)

container.resolve(ProductController)
