import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}
