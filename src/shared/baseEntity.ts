import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export class BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
    comment: 'Creation time'
  })
  createdAt!: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
    comment: 'Update time'
  })
  updatedAt!: Date

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: false,
    comment: 'Deletion time'
  })
  deletedAt!: Date
}
