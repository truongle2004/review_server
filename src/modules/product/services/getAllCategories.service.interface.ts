import { Response, type NextFunction, type Request } from 'express'

export interface IGetAllCategoriesService {
  /**
   * Get all categories
   * @param req express request
   * @param res express response
   * @param next express next
   * @returns {Promise<void>}
   */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
