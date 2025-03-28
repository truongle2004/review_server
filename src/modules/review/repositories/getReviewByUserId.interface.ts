import type { Reviews } from '../../../entities/reviews.entity'

export interface IGetReviewByUserIdRepository {
  /**
   * get review by user id
   * @param id
   * @returns  {Promise<Reviews[]>}
   */
  execute: (id: number) => Promise<Reviews[]>
}
