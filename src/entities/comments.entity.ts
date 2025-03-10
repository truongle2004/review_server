import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Reviews } from './reviews.entity'
import { Users } from './users.entity'

@Entity('comments')
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column({
    type: 'varchar'
  })
  public parentId!: string

  @Column({ type: 'int', unsigned: true })
  public lft!: number

  @Column({ type: 'int', unsigned: true })
  public rgt!: number

  @ManyToOne(() => Users, (user) => user.comments)
  public user!: Users

  // constructor(
  //   id: string,
  //   user: Users,
  //   text: string,
  //   parentId: string,
  //   reviews: Reviews
  // ) {
  //   super()
  //   this.id = id
  //   this.user = user
  //   this.text = text
  //   this.parentId = parentId
  //   this.user = user
  //   this.reviews = reviews
  // }
}
