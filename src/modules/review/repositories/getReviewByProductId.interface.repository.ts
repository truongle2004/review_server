import type { Reviews } from '../../../entities/reviews.entity'

export interface IGetReviewByProductIdRepository {
  /**
   * get review by id
   * @param id
   * @returns  {Promise<Reviews[]>}
   */
  execute: (id: number) => Promise<Reviews[]>
}
