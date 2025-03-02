import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Products } from '../../../../entities/products.entity'
import { IGetProductByIdRepository } from '../getProductById.repository.interface'

@injectable()
export class GetProductByIdRepository implements IGetProductByIdRepository {
  public execute = async (id: number): Promise<Products | null> => {
    const productRepository = AppDataSource.getRepository(Products)
    return await productRepository.findOne({
      where: {
        id
      },
      relations: ['category', 'images']
    })
  }
}
