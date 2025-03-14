import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Categories } from '../../../../entities/categories.entity'
import { IDeleteCategoryRepository } from '../deleteCategory.repository.interface'

@injectable()
export class DeleteCategoryRepository implements IDeleteCategoryRepository {
  public execute = async (id: number): Promise<number> => {
    const appSource = AppDataSource.getRepository(Categories)

    const res = await appSource.delete(id)

    return res.affected ?? 0
  }
}
