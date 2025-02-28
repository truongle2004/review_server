import { Products } from '../../../entities/products.entity'
import type { PaginationResult, SortOrder } from '../types'

export interface IGetProductPaginationRepository {
  /**
   * return product pagination by category id
   * @param categoryId category id
   * @param page page number want to fetch items
   * @param limit limit items for each page
   * @param rating rating
   * @param sort {SortOrder}
   * @returns {Promise<PaginationResult<Products>>}
   */
  execute(
    page: number,
    limit: number,
    categoryId: number | null,
    rating: number | null,
    sortBy: SortOrder
  ): Promise<PaginationResult<Products>>
}
