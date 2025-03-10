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
import { Comments } from './comments.entity'
import { Profile } from './profile.entity'
import { RatingEntity } from './rating.entity'
import { Reviews } from './reviews.entity'

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column({ type: 'varchar' })
  public password!: string

  @Column({ type: 'varchar' })
  public email!: string

  @Column({ type: 'varchar', nullable: false })
  public username!: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE
  })
  public status!: string

  @OneToMany(() => Users, (user) => user.reviews)
  public reviews!: Reviews[]

  // @ManyToMany(() => Comments, (comment) => comment.user)
  // public comments: Comments[]  | any

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    select: true
  })
  public roles!: string

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  public profile!: Profile

  @OneToMany(() => Comments, (comment) => comment.user)
  public comments!: Comments[]

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  public ratings!: RatingEntity

  public isActive(): boolean {
    return this.status === Status.ACTIVE
  }

  @BeforeInsert()
  public hashPassword() {
    // TODO hash password here
    // this.password = 'hashed password'
  }
}
