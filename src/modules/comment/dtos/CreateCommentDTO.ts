export class CreateCommentInputDTO {
  reviewId: string
  userId: string
  parentId: string
  content: string
  imagesUrl: string[]
  constructor(
    reviewId: string,
    userId: string,
    parentId: string,
    content: string,
    imagesUrl: string[]
  ) {
    this.reviewId = reviewId
    this.userId = userId
    this.parentId = parentId
    this.content = content
    this.imagesUrl = imagesUrl
  }
}

export class CreateCommentOutputDTO {}
