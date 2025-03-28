import type { NextFunction, Request, Response } from 'express'

export interface IGetReviewByUserIdService {
  /**
   * get review by user id
   * @param req express request
   * @param res express response
   * @param next express next function
   * @returns  {Promise<void>}
   */
  execute: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
