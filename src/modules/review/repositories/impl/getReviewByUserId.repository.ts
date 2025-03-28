import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Reviews } from '../../../../entities/reviews.entity'
import type { IGetReviewByUserIdRepository } from '../getReviewByUserId.interface'

@injectable()
export class GetReviewByUserIdRepository
  implements IGetReviewByUserIdRepository
{
  execute = async (id: number): Promise<Reviews[]> => {
    return await AppDataSource.getRepository(Reviews)
      .createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.user', 'user')
      .where('user.id = :id', { id })
      .getMany()
  }
}
