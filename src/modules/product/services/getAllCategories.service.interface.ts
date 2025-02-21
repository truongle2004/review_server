import { Response } from 'express'

export interface IGetAllCategoriesService {
  /**
   * Get all categories
   * @param res express response
   * @returns {Promise<void>}
   */
  execute(res: Response): Promise<void>
}
