import { NextFunction, Request, Response } from 'express'

export interface ICreateProductService {
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
