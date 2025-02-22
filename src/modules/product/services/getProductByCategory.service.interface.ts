import { Request, Response, type NextFunction } from 'express'
import { Products } from '../../../entities/products.entity'

export interface IGetProductByCategoryService {
  /**
   * Get product by category
   * @param req express request
   * @param res express response
   * @param next express next
   * @returns {Promise<void>}
   */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
