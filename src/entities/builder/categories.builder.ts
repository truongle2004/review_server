import { Categories } from "../categories.entity"
import { Products } from "../products.entity"

export class CategoriesBuilder {
  private id!: number
  private name!: string
  private description!: string
  private products: Products[] = []

  public setId(id: number): CategoriesBuilder {
    this.id = id
    return this
  }

  public setName(name: string): CategoriesBuilder {
    this.name = name
    return this
  }

  public setDescription(description: string): CategoriesBuilder {
    this.description = description
    return this
  }

  public setProducts(products: Products[]): CategoriesBuilder {
    this.products = products
    return this
  }

  public build(): Categories {
    return new Categories(this.id, this.name, this.description, this.products)
  }
}
