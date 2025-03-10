import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Reviews } from './reviews.entity'
import { Profile } from './profile.entity'
import {Comments} from "./comments.entity";
export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}
export enum Role{
  ADMIN = 'ADMIN',
  USER = 'USER'
}
@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'varchar', nullable: false })
  public password: string

  @Column({ type: 'varchar', nullable: false })
  public email: string

  @Column({ type: 'varchar', nullable: false })
  public username!: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE
  })
  public status: string

  @OneToMany(() => Reviews, (review) => review.user)
  public reviews: Reviews[] | undefined

  @OneToMany(() => Comments, (comment) => comment.user)
  public comments: Comments[] | undefined

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    select: true
  })
  public roles: string

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  public profile: Profile | undefined

  constructor( 
    id: string,
    username: string,
    email: string,
    password: string,
    status: string,
    roles: string,
  ) {
    super()
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.status = status
    this.roles = roles
  }
}