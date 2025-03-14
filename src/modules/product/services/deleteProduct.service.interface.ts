import type { NextFunction, Request, Response } from 'express'

export interface IDeleteProductService {
  /**
   * delete a product from database by product id
   * @param req express request
   * @param res express response
   */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
