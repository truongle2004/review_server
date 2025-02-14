import type { Request, Response } from 'express'

export interface IGetProductService {
  execute(req: Request, res: Response): Promise<void>
}
