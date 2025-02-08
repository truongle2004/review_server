import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { slugify } from '../utils/slugify'
import { Products } from './products.entity'

@Entity('images')
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar'
  })
  public src: string

  @Column({
    type: 'varchar'
  })
  public alt: string

  @ManyToOne(() => Products, (product) => product.images)
  public product: Products

  constructor(id: number, src: string, alt: string, product: Products) {
    super()
    this.id = id
    this.src = src
    this.alt = alt
    this.product = product
  }

  // TODO: create getter

  @BeforeInsert()
  public handleEmptyAlt() {
    if (this.alt === undefined) {
      if (this.product.title === undefined) return
      this.alt = slugify(this.product.title)
    }
  }
}
