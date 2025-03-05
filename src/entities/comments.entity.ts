import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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
  public parentId: string;

  @ManyToOne(() => Comments, (comment) => comment.replies, {
    onDelete: 'CASCADE', // Khi comment cha bị xoá, comment con cũng bị xoá
    nullable: true,
  })
  @JoinColumn({ name: 'parentId'})
  public parent: Comments | null;

  @ManyToOne(() => Users, (user) => user.comments, { nullable: false })
  public user: Users;

  @ManyToOne(() => Reviews, (review) => review.comments, { nullable: false })
  public reviews: Reviews;

  @OneToMany(() => Comments, (comment) => comment.parent, {cascade: true})
  public replies: Comments[];

}
