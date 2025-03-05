export class CreateCommentInputDTO{
     reviewId:string
     userId: string
     parentId:string
     content: string

    constructor(reviewId: string, userId: string, parentId: string, content: string) {
         this.reviewId = reviewId;
         this.userId = userId;
         this.parentId = parentId;
         this.content = content;
    }
}

export class CreateCommentOutputDTO{
}