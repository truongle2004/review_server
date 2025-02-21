import { Categories } from '../../../entities/categories.entity'

export interface IGetAllCategoriesRepository {
  /**
   * Get all categories
   * @returns {Promise<Categories[]>}
   */
  execute(): Promise<Categories[]>
}
