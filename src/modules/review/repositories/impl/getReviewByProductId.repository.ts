import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Reviews } from '../../../../entities/reviews.entity'
import type { IGetReviewByProductIdRepository } from '../getReviewByProductId.interface.repository'

@injectable()
export class GetReviewByProductIdRepository
  implements IGetReviewByProductIdRepository
{
  execute = async (id: number): Promise<any[]> => {
    const appSource = AppDataSource.getRepository(Reviews)

    return await appSource
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoin('review.comments', 'comments')
      .select([
        'review.id',
        'review.rating',
        'review.createdAt',
        'review.title',
        'user.id',
        'user.username',
        'profile.id',
        'profile.profile_picture',
        'product.id',
        'product.title'
      ])
      .addSelect('COUNT(comments.id)', 'commentCount')
      .where('product.id = :id', { id })
      .groupBy('review.id, user.id, profile.id, product.id, product.title')
      .getRawMany()
  }
}
