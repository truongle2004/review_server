export interface IDeleteReviewRepository {
  /**
   * Delete a review by ID
   * @param id
   * @returns {Promise<boolean>}
   */
  execute: (id: string) => Promise<boolean>
}
