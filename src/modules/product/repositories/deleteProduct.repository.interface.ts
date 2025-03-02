export interface IDeleteProductRepository {
  /**
   * delete product from database by id
   * @param id product id
   */
  execute(id: number): Promise<number>
}
