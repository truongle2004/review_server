import { NextFunction, Request, Response } from 'express'

export interface ISearchReviewByTitleService {
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
