import { Categories } from '../../../entities/categories.entity'

export interface IAddCategoryRepository {
  /**
   * add new a category
   * @param category category name
   * @param description
   * @returns {Promise<Categories>}
   */
  execute(category: string, description: string): Promise<Categories>
}
