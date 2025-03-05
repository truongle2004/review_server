
export interface ICommentDatabase {
  create(data: any): Promise<any>;
  getListCommentByReviewId(reviewId:string):Promise<any>;
  findReview(reviewId:string):Promise<any>;
  findUser(userId:string):Promise<any>;
}