import { NextFunction, Request, Response } from 'express'

export interface ISaveRatingServide {
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
