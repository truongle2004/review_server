import type { NextFunction, Request, Response } from 'express'

export interface IGetProductService {
  /**
   * Get paginate product
   * @param req express request
   * @param res express response
   * @param next express next
   * @returns {Promise<void>}
   */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
