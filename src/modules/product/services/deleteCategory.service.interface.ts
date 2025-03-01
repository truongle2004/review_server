import { NextFunction, Request, Response } from 'express'

export interface IDeleteCategoryService {
  /*
   * delete a product from database by product id
   * @param req express request
   * @param res express response
   * @returns {Promise<void>}
   * */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
