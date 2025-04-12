import { NextFunction, Request, Response } from 'express'

export interface IUpdateReviewService {
  /**
   * Update a review by ID
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  execute: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
