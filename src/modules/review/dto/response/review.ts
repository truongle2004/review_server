export class ReviewResponseDto {
  public id!: string
  public content!: string
  public title!: string
  public rating!: number
  public user!: {
    id: string
    // username: string
  }
  public product!: {
    id: number
    title: string
  }

  constructor(
    id: string,
    content: string,
    title: string,
    rating: number,
    user: { id: string },
    product: { id: number; title: string }
  ) {
    this.id = id
    this.content = content
    this.title = title
    this.user = user
    this.rating = rating
    this.product = product
  }
}
