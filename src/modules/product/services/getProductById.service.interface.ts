import { Request, Response } from 'express'

export interface IGetProductByIdService {
  /**
   * Get product information by id
   * @param req express request
   * @param res express response
   * @returns {Promise<void>}
   */
  execute(req: Request, res: Response): Promise<void>
}
