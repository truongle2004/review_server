import { Comments } from "../../../entities/comments.entity";
import { Reviews } from "../../../entities/reviews.entity";
import { Users } from "../../../entities/users.entity";
import { CreateCommentInputDTO } from "../dtos/CreateCommentDTO";

export interface ICommentDatabase {
  create(data: CreateCommentInputDTO): Promise<Comments>;
   getListCommentByReviewId(reviewId:string):Promise<Comments[]>;
  findReview(reviewId:string):Promise<Reviews>;
  findUser(userId:string):Promise<Users>;
  update(userId:string,commentId:string,content:string):Promise<Comments>;
  findComment(commentId:string):Promise<Comments>
  findUserByCommentId(data: string):Promise<Users | null>
}