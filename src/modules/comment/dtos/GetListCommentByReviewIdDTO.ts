import { Comments } from "../../../entities/comments.entity";

export class GetListCommentByReviewIdInputDTO {
  reviewId: string;
  constructor(reviewId: string) {
    this.reviewId = reviewId
  }
}


export class GetListCommentByReviewIdOutputDTO {
 comments:Comments[]

  constructor(comments: Comments[]) {
    this.comments = comments
  }
}