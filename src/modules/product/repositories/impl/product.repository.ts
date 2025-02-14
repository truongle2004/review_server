import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Products } from '../../../../entities/products.entity'
import type { PaginationResult } from '../../types'
import { paginate } from '../../utils/paginate'
import type { IProductRepository } from '../product.repository.interface'

@injectable()
export class ProductRepository implements IProductRepository {
  getProducts(
    page: number,
    limit: number
  ): Promise<PaginationResult<Products>> {
    const productRepository = AppDataSource.getRepository(Products)
    return paginate<Products>(productRepository, page, limit)
  }
}
