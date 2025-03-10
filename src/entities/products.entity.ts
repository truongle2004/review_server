import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Categories } from './categories.entity'
import { Images } from './images.entity'
import { Reviews } from './reviews.entity'

@Entity('products')
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'tinyint'
  })
  public rating: number

  @Index({
    unique: true
  })
  @Column({
    type: 'varchar'
  })
  public title: string

  @Column({
    type: 'longtext'
  })
  public description: string

  @ManyToOne(() => Categories, (category) => category.products, {
    onDelete: 'SET NULL',
    nullable: true
  })
  public category: Categories

  @OneToMany(() => Images, (images) => images.product, {
    cascade: true
  })
  public images: Images[]

  @OneToMany(() => Reviews, (reviews) => reviews.product, {
    cascade: true
  })
  public reviews: Reviews[]

  constructor(
    id: number,
    description: string,
    category: Categories,
    images: Images[],
    rating: number,
    title: string,
    reviews: Reviews[]
  ) {
    super()
    this.id = id
    this.description = description
    this.category = category
    this.images = images
    this.rating = rating
    this.title = title
    this.reviews = reviews
  }
}
