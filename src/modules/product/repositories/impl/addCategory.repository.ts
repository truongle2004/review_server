import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { CategoriesBuilder } from '../../../../entities/builder/categories.builder'
import { Categories } from '../../../../entities/categories.entity'
import { IAddCategoryRepository } from '../addCategory.repository.interface'

@injectable()
export class AddCategoryRepository implements IAddCategoryRepository {
  public execute = async (
    category: string,
    description: string
  ): Promise<Categories> => {
    const databaseSource = AppDataSource.getRepository(Categories)

    const newCategory = new CategoriesBuilder()
      .setName(category)
      .setDescription(description)
      .setProducts([])
      .build()

    return await databaseSource.save(newCategory)
  }
}
