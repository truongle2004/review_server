import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Reviews } from './reviews.entity'
import { Roles } from './roles.entity'
import { Profile } from './profile.entity'

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
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

  @ManyToMany(() => Roles, (role) => role.users, {
    cascade: ['insert', 'update']
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  public roles: Roles[]

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  public profile: Profile

  constructor(
    id: string,
    password: string,
    email: string,
    status: string,
    reviews: Reviews,
    roles: Roles[],
    profile: Profile
  ) {
    super()
    this.id = id
    this.password = password
    this.email = email
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
