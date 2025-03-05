import { Reviews } from '../../../entities/reviews.entity'

export interface ISaveReviewRepository {
  /**
   * save new review
   * @param review
   * @returns  {Promise<Reviews>}
   */
  execute: (review: Reviews) => Promise<Reviews>
}
