
export class UpdateCommentInputDTO{
    userId:string
    reviewId:string
    commentId:string
    content:string
    constructor(userId:string,reviewId:string,commentId:string,content:string){
        this.userId = userId
        this.reviewId = reviewId
        this.commentId = commentId
        this.content =content 
    }

}

export class UpdateCommentOutputDTO{
    
}