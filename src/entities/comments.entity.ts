import {Column, Entity, ManyToOne,  PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Reviews } from './reviews.entity'
import { Users } from './users.entity'



@Entity('comments')
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')

  public id: string;

  @Column({ type: 'text' })
  public text: string;

  @Column({ type: 'int', unsigned: true })
  public lft: number;

  @Column({ type: 'int', unsigned: true })
  public rgt: number;

  @Column({ type: 'uuid', nullable: true })
  public parentId: string | null ; // ID của comment cha

  @ManyToOne(() => Users, (user) => user.comments, { nullable: false })
  public user: Users;

  @ManyToOne(() => Reviews, (review) => review.comments, { nullable: false })
  public reviews: Reviews;

}
