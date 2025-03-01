import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Products } from './products.entity'
import { Users } from './users.entity'
import { Comments } from './comments.entity'


@Entity('reviews')
export class Reviews extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'tinyint'
  })
  public rating: number

  @Column({
    type: 'longtext'
  })
  public content: string

  @ManyToOne(() => Products, (product) => product.reviews, {
    onDelete: 'CASCADE'
  })
  public product: Products

  @ManyToOne(() => Users, (user) => user.reviews)
  public user: Users


  @OneToMany(() => Comments, (comment) => comment.reviews)
  public comments:Comments


  constructor(
    id: string,
    rating: number,
    content: string,
    product: Products,
    user: Users,
    comments:Comments
  ) {
    super()
    this.id = id
    this.rating = rating
    this.content = content
    this.product = product
    this.user = user
    this.comments = comments
  }

  @BeforeInsert()
  public hashPassword() {
    // TODO hash password here
  }
}
