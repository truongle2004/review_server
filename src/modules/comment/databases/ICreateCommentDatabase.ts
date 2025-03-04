
export interface ICreateCommentDatabase{
  execute(data: any): Promise<any>;
  findReview(reviewId:string):Promise<any>;
  findUser(userId:string):Promise<any>;
  updateLeftAndRight(commentId:string,left:number,right:number):Promise<any>;
}