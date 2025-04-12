import { Reviews } from '../../../entities/reviews.entity'

export interface IUpdateReviewRepository {
  /**
   * Update a review by ID
   * @param id
   * @param title
   * @param content
   * @returns {Promise<Reviews | null>}
   */
  execute: (
    id: string,
    title: string,
    content: string
  ) => Promise<Reviews | null>
}
