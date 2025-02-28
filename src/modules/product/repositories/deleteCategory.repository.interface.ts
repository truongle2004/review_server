export interface IDeleteCategoryRepository {
  /*
   * delete category by id
   * @params id category id
   * @returns {Promise<number>}
   * */
  execute(id: number): Promise<number>
}
