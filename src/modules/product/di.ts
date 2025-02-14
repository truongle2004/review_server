import 'reflect-metadata'
import { container } from 'tsyringe'
import { ProductController } from './controllers/product.controller'
import { ProductRepository } from './repositories/impl/product.repository'
import { IGetProductService } from './services/get-product.interface.service'
import { GetProductService } from './services/impl/get-product.service'
import { IProductRepository } from './repositories/product.repository.interface'

container.register<IProductRepository>('IProductRepository', {
  useClass: ProductRepository
})

container.register<IGetProductService>('IGetProductService', {
  useClass: GetProductService
})

const res = container.resolve(ProductController)
console.log(res)
