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
import { Profile } from './profile.entity'
import { Reviews } from './reviews.entity'
import { Comments } from './comments.entity'

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

enum Roles {
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
    enum: Roles
  })
  public roles: string

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  public profile: Profile

  @OneToMany(() => Comments, (comment) => comment.user)
  public comments: Comments[]

  constructor(
    id: string,
    comments: Comments[],
    password: string,
    email: string,
    status: string,
    reviews: Reviews,
    roles: string,
    profile: Profile
  ) {
    super()
    this.id = id
    this.password = password
    this.email = email
    this.status = status
    this.reviews = reviews
    this.comments = comments
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
