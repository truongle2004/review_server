import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Products } from '../../../../entities/products.entity'
import type { PaginationResult } from '../../types'
import { paginate } from '../../utils/paginate'
import { IGetProductByCategoryRepository } from '../getProductByCategory.repository.interface'

@injectable()
export class GetProductByCategoryRepository
  implements IGetProductByCategoryRepository
{
  public execute = async (
    categoryId: number,
    page: number,
    limit: number
  ): Promise<PaginationResult<Products>> => {
    const productRepository = AppDataSource.getRepository(Products)
    const ralations = ['category', 'images']

    return await paginate<Products>(
      productRepository,
      page,
      limit,
      ralations,
      categoryId
    )
  }
}
