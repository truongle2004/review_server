import type { NextFunction, Response, Request } from 'express'

export interface IGetReviewByProductIdService {
  /**
   * get review by product id
   * @param req express request
   * @param res express response
   * @param next express next function
   */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
