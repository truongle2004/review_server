import { Request, Response, type NextFunction } from 'express'

export interface IAddCategoryService {
  /**
   * save category
   * @param req express request
   * @param res express response
   * @returns {Promise<void>}
   * */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
