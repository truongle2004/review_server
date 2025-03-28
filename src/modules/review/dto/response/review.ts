export class ReviewResponseDto {
  public id!: string
  public content!: string
  public title!: string
  public rating!: number
  public createdAt!: Date
  public user!: {
    id: string
    username: string
  }
  public product!: {
    id: number
    title: string
  }

  constructor(
    id: string,
    title: string,
    content: string,
    rating: number,
    user: { id: string; username: string },
    product: { id: number; title: string },
    createdAt: Date
  ) {
    this.id = id
    this.content = content
    this.title = title
    this.user = user
    this.rating = rating
    this.product = product
    this.createdAt = createdAt
  }
}
