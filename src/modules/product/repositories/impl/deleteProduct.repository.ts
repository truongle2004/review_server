import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Products } from '../../../../entities/products.entity'
import type { IDeleteProductRepository } from '../deleteProduct.repository.interface'

@injectable()
export class DeleteProductRepository implements IDeleteProductRepository {
  public execute = async (id: number): Promise<number> => {
    const databaseSource = AppDataSource.getRepository(Products)

    const res = await databaseSource.delete(id)

    return res.affected ?? 0
  }
}
