import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Products } from './products.entity'

@Entity('categories')
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'tinyint'
  })
  public id: number

  @Column({
    type: 'varchar',
    length: 200
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 255
  })
  public description: string

  @OneToMany(() => Products, (product) => product.category)
  public products: Products[]

  constructor(
    id: number,
    name: string,
    description: string,
    products: Products[]
  ) {
    super()
    this.id = id
    this.name = name
    this.description = description
    this.products = products
  }

  public get getId(): number {
    return this.id
  }

  public get getName(): string {
    return this.name
  }

  public get getDescription(): string {
    return this.description
  }

  public get getProducts(): Products[] {
    return this.products
  }
}
