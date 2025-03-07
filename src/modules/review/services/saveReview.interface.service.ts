import type { NextFunction, Request, Response } from 'express'

export interface ISaveReviewService {
  /**
   * save a new review
   * @param req express request
   * @param res express response
   * @param next express next function
   */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
