import type { Categories } from '../categories.entity'
import type { Images } from '../images.entity'
import { Products } from '../products.entity'
import type { Reviews } from '../reviews.entity'

export class ProductBuilder {
  private id!: number
  private rating!: number
  private title!: string
  private description!: string
  private category!: Categories
  private images: Images[] = []
  private reviews: Reviews[] = []

  setId(id: number): ProductBuilder {
    this.id = id
    return this
  }

  setRating(rating: number): ProductBuilder {
    this.rating = rating
    return this
  }

  setTitle(title: string): ProductBuilder {
    this.title = title
    return this
  }

  setDescription(description: string): ProductBuilder {
    this.description = description
    return this
  }

  setCategory(category: Categories): ProductBuilder {
    this.category = category
    return this
  }

  setImages(images: Images[]): ProductBuilder {
    this.images = images
    return this
  }

  setReviews(reviews: Reviews[]): ProductBuilder {
    this.reviews = reviews
    return this
  }

  build(): Products {
    return new Products(
      this.id,
      this.description,
      this.category,
      this.images,
      this.rating,
      this.title,
      this.reviews
    )
  }
}
