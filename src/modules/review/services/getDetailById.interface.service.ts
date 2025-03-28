import type { NextFunction, Request, Response } from 'express'

export interface IGetDetailByIdService {
  /**
   * get detail review by id
   * @param req express request
   * @param res express response
   * @param next express next function
   */
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
