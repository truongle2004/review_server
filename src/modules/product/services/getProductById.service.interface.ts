import { Request, Response, type NextFunction } from 'express'

export interface IGetProductByIdService {
  /**
   * Get product information by id
   * @param req express request
   * @param res express response
   * @param next express next
   * @returns {Promise<void>}
   */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
