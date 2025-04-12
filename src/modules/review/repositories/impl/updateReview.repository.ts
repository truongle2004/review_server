import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Reviews } from '../../../../entities/reviews.entity'
import { IUpdateReviewRepository } from '../updateReview.interface.repository'

@injectable()
export class UpdateReviewRepository implements IUpdateReviewRepository {
  public execute = async (
    id: string,
    title: string,
    content: string
  ): Promise<Reviews | null> => {
    const repository = AppDataSource.getRepository(Reviews)

    // First check if the review exists
    const review = await repository.findOne({
      where: { id }
    })

    if (!review) {
      return null
    }

    // Update the review
    review.title = title
    review.content = content

    // Save and return the updated review
    return await repository.save(review)
  }
}
