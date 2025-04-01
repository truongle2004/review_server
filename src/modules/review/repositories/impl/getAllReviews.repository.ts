import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Reviews } from '../../../../entities/reviews.entity'
import { IGetAllReviewsRepository } from '../getAllReviews.interface.repository'

@injectable()
export class GetAllReviewsRepository implements IGetAllReviewsRepository {
  public execute = async (
    page: number,
    limit: number
  ): Promise<{ data: Reviews[]; total: number }> => {
    const reviewRepository = AppDataSource.getRepository(Reviews)
    const skip = (page - 1) * limit

    const [reviews, total] = await reviewRepository.findAndCount({
      relations: ['user', 'user.profile', 'product'],
      select: {
        id: true,
        title: true,
        content: true,
        rating: true,
        createdAt: true,
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
      },
      skip,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    })

    return {
      data: reviews,
      total
    }
  }
}
