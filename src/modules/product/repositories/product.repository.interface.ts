import type { Products } from '../../../entities/products.entity'
import type { PaginationResult } from '../types'

export interface IProductRepository {
  getProducts(page: number, limit: number): Promise<PaginationResult<Products>>
}
