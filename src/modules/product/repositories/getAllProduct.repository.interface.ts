import type { Products } from '../../../entities/products.entity'
import type { PaginationResult } from '../types'

export interface IProductRepository {
  /**
   * return product paginate
   * @param page page number
   * @param limit limit product of each page
   * @returns {Promise<PaginationResult<Products>>}
   */
  execute(page: number, limit: number): Promise<PaginationResult<Products>>
}
