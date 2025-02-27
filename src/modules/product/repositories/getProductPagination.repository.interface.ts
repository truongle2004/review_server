import { Products } from '../../../entities/products.entity'
import type { PaginationResult } from '../types'

export interface IGetProductPaginationRepository {
  /**
   * return product pagination by category id
   * @param categoryId category id
   * @param page page number want to fetch items
   * @param limit limit items for each page
   * @returns {Promise<PaginationResult<Products>>}
   */
  execute(
    page: number,
    limit: number,
    categoryId: number | null,
    rating: number | null
  ): Promise<PaginationResult<Products>>
}
