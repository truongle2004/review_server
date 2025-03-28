import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Categories } from '../../../../entities/categories.entity'
import { IGetAllCategoriesRepository } from '../getAllCategories.repository.interface'

@injectable()
export class GetAllCategoriesRepository implements IGetAllCategoriesRepository {
  public execute = async (): Promise<Categories[]> => {
    return await AppDataSource.getRepository(Categories)
      .createQueryBuilder('categories')
      .select(['categories.id', 'categories.name', 'categories.description'])
      .orderBy('categories.name', 'ASC')
      .getMany()
  }
}
