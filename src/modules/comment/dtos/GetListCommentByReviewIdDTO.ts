export class GetListCommentByReviewIdInputDTO {
  reviewId: string;
  constructor(reviewId: string) {
    this.reviewId = reviewId
  }
}


export class GetListCommentByReviewIdOutputDTO {
 comments:any[]

  constructor(comments: any[]) {
    this.comments = comments
  }
}