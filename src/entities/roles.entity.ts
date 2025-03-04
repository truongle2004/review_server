
// import {
//   Column,
//   Entity,
//   JoinTable,
//   ManyToMany,
//   PrimaryGeneratedColumn
// } from 'typeorm'
// import { Users } from './users.entity'


// @Entity('roles')
// export class Roles {
//   @PrimaryGeneratedColumn()
//   public id: number

//   @Column({
//     type: 'varchar'
//   })
//   public name: string

//   @ManyToMany(() => Users, (user) => user.roles)
//   public users: Users

//   constructor(id: number, name: string, users: Users) {
//     this.id = id
//     this.name = name
//     this.users = users
//   }
// }
