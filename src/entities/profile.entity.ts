import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Users } from './users.entity'

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'varchar', length: 20, unique: true })
  public phone: string

  @Column({ type: 'text', nullable: true })
  public bio: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  public profile_picture: string

  @Column({ type: 'varchar', length: 50 })
  public country: string

  @Column({ type: 'date' })
  public birthday: Date

  @Column({ type: 'enum', enum: Gender })
  public gender: Gender

  @OneToOne(() => Users, (user) => user.profile)
  public user: Users

  constructor(
    phone: string,
    id: string,
    gender: Gender,
    birthday: Date,
    country: string,
    profile_picture: string,
    bio: string,
    user: Users
  ) {
    super()
    this.phone = phone
    this.id = id
    this.gender = gender
    this.birthday = birthday
    this.country = country
    this.profile_picture = profile_picture
    this.bio = bio
    this.user = user
  }
}
