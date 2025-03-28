import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Users } from './users.entity'
import { Reviews } from './reviews.entity'

@Entity('rating')
export class RatingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({
    type: 'int',
    nullable: false
  })
  public rating!: number

  @ManyToOne(() => Reviews, (review) => review.rating_entity)
  public reviews!: Reviews

  @ManyToOne(() => Users, (user) => user.ratings)
  public user!: Users
}
