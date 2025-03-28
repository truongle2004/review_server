import { injectable } from 'tsyringe'
import { Reviews } from '../../../../entities/reviews.entity'
import type { IGetDetailByIdRepository } from '../getDetailById.interface.repository'
import { AppDataSource } from '../../../../config/data-source'

@injectable()
export class GetDetailByIdRepository implements IGetDetailByIdRepository {
  public execute = async (id: string): Promise<Reviews> => {
    return (await AppDataSource.getRepository(Reviews).findOne({
      where: {
        id
      },
      relations: ['product', 'user', 'user.profile'],
      select: {
        id: true,
        rating: true,
        createdAt: true,
        title: true,
        content: true,
        user: {
          id: true,
          username: true,
          profile: {
            id: true,
            profile_picture: true
          }
        },
        product: {
          id: true,
          title: true
        }
      }
    })) as Reviews
  }
}
