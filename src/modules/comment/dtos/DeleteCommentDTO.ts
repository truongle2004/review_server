export class DeleteCommentInputDTO{
    reviewId: string
    parentId:string
    userId:string
    commentId: string
    constructor(reviewId: string, parentId: string, commentId: string, userId: string) {
        this.reviewId = reviewId;
        this.parentId = parentId;
        this.commentId = commentId;
        this.userId = userId;
    }
}


export class DeleteCommentOutputDTO{

}