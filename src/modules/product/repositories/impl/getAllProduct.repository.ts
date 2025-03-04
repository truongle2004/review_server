import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Products } from '../../../../entities/products.entity'
import type { PaginationResult } from '../../types'
import { paginate } from '../../utils/paginate'
import type { IProductRepository } from '../getAllProduct.repository.interface'

@injectable()
export class ProductRepository implements IProductRepository {
  public execute = async (
    page: number,
    limit: number
  ): Promise<PaginationResult<Products>> => {
    const productRepository = AppDataSource.getRepository(Products)
    const ralations = ['category', 'images']

    return await paginate<Products>(productRepository, page, limit, ralations)
  }
}
