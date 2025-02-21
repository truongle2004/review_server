import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Categories } from '../../../../entities/categories.entity'
import { IGetAllCategoriesRepository } from '../getAllCategories.repository.interface'

@injectable()
export class GetAllCategoriesRepository implements IGetAllCategoriesRepository {
  public execute = async (): Promise<Categories[]> => {
    const databaseSource = AppDataSource.getRepository(Categories)

    const categories = await databaseSource.find()

    return categories.length > 0 ? categories : []
  }
}
