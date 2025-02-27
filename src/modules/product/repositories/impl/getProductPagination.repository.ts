import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Products } from '../../../../entities/products.entity'
import type { PaginationResult } from '../../types'
import { paginate } from '../../utils/paginate'
import { IGetProductPaginationRepository } from '../getProductPagination.repository.interface'

@injectable()
export class GetProductPaginationRepository
  implements IGetProductPaginationRepository
{
  public execute = async (
    page: number,
    limit: number,
    categoryId: number,
    rating: number
  ): Promise<PaginationResult<Products>> => {
    const productRepository = AppDataSource.getRepository(Products)
    const ralations = ['category', 'images']

    return await paginate<Products>(
      productRepository,
      page,
      limit,
      ralations,
      categoryId,
      rating
    )
  }
}
