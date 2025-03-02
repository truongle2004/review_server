import { Products } from '../../../entities/products.entity'

export interface IGetProductByIdRepository {
  /**
   * Get product information by id
   * @param productId product id
   * @returns {Promise<Products | null>}
   */
  execute(productId: number): Promise<Products | null>
}
