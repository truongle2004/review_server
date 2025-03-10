import type { Comments } from '../comments.entity'
import type { Products } from '../products.entity'
import { Reviews } from '../reviews.entity'
import type { Users } from '../users.entity'

export class ReviewsBuilder {
  public id!: string
  public rating!: number
  public content!: string
  public title!: string
  public product!: Products
  public user!: Users
  public comments!: Comments

  public setId(id: string): ReviewsBuilder {
    this.id = id
    return this
  }

  public setTitle(title: string): ReviewsBuilder {
    this.title = title
    return this
  }

  public setRating(rating: number): ReviewsBuilder {
    this.rating = rating && 0
    return this
  }

  public setContent(content: string): ReviewsBuilder {
    this.content = content
    return this
  }

  public setProduct(product: Products): ReviewsBuilder {
    this.product = product
    return this
  }

  public setUser(user: Users): ReviewsBuilder {
    this.user = user
    return this
  }

  public setComments(comments: Comments): ReviewsBuilder {
    this.comments = comments
    return this
  }

  public build(): Reviews {
    return new Reviews(
      this.id,
      this.rating,
      this.content,
      this.product,
      this.user,
      this.title
    )
  }
}
