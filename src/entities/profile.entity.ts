import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Users } from './users.entity'

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column({ type: 'varchar', length: 20, unique: true })
  public phone?: string

  @Column({ type: 'text', nullable: true })
  public bio?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  public profile_picture?: string

  @Column({ type: 'varchar', length: 50 })
  public country?: string

  @Column({ type: 'date' })
  public birthday?: Date

  @Column({ type: 'enum', enum: Gender })
  public gender?: Gender

  @OneToOne(() => Users, (user) => user.profile)
  public user!: Users
}
