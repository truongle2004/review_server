import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { IDeleteReviewRepository } from '../deleteReview.interface.repository'
import { Comments } from '../../../../entities/comments.entity'

@injectable()
export class DeleteReviewRepository implements IDeleteReviewRepository {
  public execute = async (id: string): Promise<boolean> => {
    const reviewRepository = AppDataSource.getRepository('reviews')
    const commentRepository = AppDataSource.getRepository(Comments)

    // First check if the review exists
    const review = await reviewRepository.findOne({
      where: { id }
    })

    if (!review) {
      return false
    }

    // Delete related comments first
    await commentRepository.delete({ reviews: { id } })

    // Delete the review
    const result = await reviewRepository.delete({ id })

    // Return true if at least one row was affected
    return result.affected ? result.affected > 0 : false
  }
}
