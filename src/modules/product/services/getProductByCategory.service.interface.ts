import { Request, Response } from 'express'
import { Products } from '../../../entities/products.entity'

export interface IGetProductByCategoryService {
  /**
   * Get product by category
   * @param req express request
   * @param res express response
   * @returns {Promise<void>}
   */
  execute(req: Request, res: Response): Promise<void>
}
