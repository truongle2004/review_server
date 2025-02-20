import {Column, Entity, ManyToOne,  PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Reviews } from './reviews.entity'
import {Users} from "./users.entity";

@Entity('comments')
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'text'
  })
  public text: string

  @Column({
    type: 'string'
  })
  public parentId: string

  @ManyToOne(() => Users, (user) => user.comments)
  public user: Users

  @ManyToOne(() => Reviews, (review) => review.comments)
  public reviews: Reviews

  constructor(
    id: string,
    text: string,
    parentId: string,
    user: Users,
    reviews: Reviews
  ) {
    super()
    this.id = id
    this.text = text
    this.parentId = parentId
    this.user = user
    this.reviews = reviews
  }

  public isRoot(): boolean {
    return this.parentId === null
  }
}
