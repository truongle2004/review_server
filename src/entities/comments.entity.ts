import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Reviews } from './reviews.entity'

@Entity('comments')
export class Commnets extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'text'
  })
  public text: string

  @Column({
    type: 'int'
  })
  public parentId: number

  @ManyToOne(() => Reviews, (review) => review.comments)
  public reviews: Reviews

  constructor(id: string, text: string, parentId: number, reviews: Reviews) {
    super()
    this.id = id
    this.text = text
    this.parentId = parentId
    this.reviews = reviews
  }

  public isRoot(): boolean {
    return this.parentId === null
  }
}
