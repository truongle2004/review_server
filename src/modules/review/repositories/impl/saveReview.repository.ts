import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Reviews } from '../../../../entities/reviews.entity'
import { ISaveReviewRepository } from '../saveReview.interface.repository'

@injectable()
export class SaveReviewRepository implements ISaveReviewRepository {
  public execute = async (review: Reviews): Promise<Reviews> => {
    const appSource = AppDataSource.getRepository(Reviews)

    return await appSource.save(review)
  }
}
