import { Reviews } from '../../../entities/reviews.entity'

export interface IGetAllReviewsRepository {
  /**
   * Get all reviews with pagination
   * @param page
   * @param limit
   * @returns {Promise<{data: Reviews[], total: number}>}
   */
  execute: (
    page: number,
    limit: number
  ) => Promise<{
    data: Reviews[]
    total: number
  }>
}
