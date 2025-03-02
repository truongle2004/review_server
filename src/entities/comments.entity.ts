import {Column, Entity, ManyToOne,  PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Reviews } from './reviews.entity'
import {Users} from "./users.entity";


@Entity('comments')
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'text' })
  public text: string;

  @Column({ type: 'int', unsigned: true })
  public lft: number; // Giá trị left trong Nested Set

  @Column({ type: 'int', unsigned: true })
  public rgt: number; // Giá trị right trong Nested Set

  @Column({ type: 'uuid', nullable: true })
  public parentId: string | null; // ID của comment cha, để hỗ trợ khi thêm mới

  @ManyToOne(() => Users, (user) => user.comments, { nullable: false })
  public user: Users;

  @ManyToOne(() => Reviews, (review) => review.comments, { nullable: false })
  public reviews: Reviews;

  constructor(text: string, user: Users, reviews: Reviews, parentId?: string) {
    super();
    this.text = text;
    this.user = user;
    this.reviews = reviews;
    this.parentId = parentId || null;
    // lft và rgt sẽ được tính toán khi thêm/sửa/xóa comment
  }

  public isRoot(): boolean {
    return this.parentId === null;
  }
}
