import { NextFunction, Request, Response } from 'express'

export interface IGetAllReviewsService {
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
