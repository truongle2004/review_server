import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Reviews } from '../../../../entities/reviews.entity'
import { ISaveReviewRepository } from '../saveReview.interface.repository'

@injectable()
export class SaveReviewRepository implements ISaveReviewRepository {
  public execute = async (review: Reviews): Promise<Reviews> => {
    const repository = AppDataSource.getRepository(Reviews)

    const saved = await repository.save(review)

    return (await repository.findOne({
      where: {
        id: saved.id
      },
      relations: ['product', 'user'],
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
          id: false,
          title: false
        }
      }
    })) as Reviews
  }
}
