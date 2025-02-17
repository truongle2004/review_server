/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BeforeInsert,
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

  @Column({ type: 'varchar' })
  public password: string

  @Column({ type: 'varchar' })
  public email: string

  @Column({
    type: 'enum',
    enum: Status
  })
  public status: string

  @OneToMany(() => Users, (user) => user.reviews)
  public reviews: Reviews

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    select: true
  })
  public roles: string

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  public profile: Profile

constructor(
  id: string, // Có thể undefined khi tạo mới
  email: string,
  password: string,
  status: Status = Status.ACTIVE,
  roles:string,
  reviews?: Reviews | any,
  profile?: Profile | any,
) {
  super()
  this.id = id ?? crypto.randomUUID() // Nếu không có id, tự tạo UUID (hoặc để TypeORM tự tạo)
  this.email = email
  this.password = password
  this.status = status
  this.reviews = reviews 
  this.roles = roles
  this.profile = profile 
}

  public isActive(): boolean {
    return this.status === Status.ACTIVE
  }

  @BeforeInsert()
  public hashPassword() {
    // TODO hash password here
    // this.password = 'hashed password'
  }
}
