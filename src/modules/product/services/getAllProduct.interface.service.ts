import type { Request, Response } from 'express'

export interface IGetProductService {
  /**
   * Get paginate product
   * @param req express request
   * @param res express response
   * @returns {Promise<void>}
   */
  execute(req: Request, res: Response): Promise<void>
}
