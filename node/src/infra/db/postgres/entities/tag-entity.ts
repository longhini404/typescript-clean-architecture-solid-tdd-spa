import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { TaskEntity } from './task-entity'

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  title: string

  @ManyToMany(() => TaskEntity, (task) => task.tags)
  tasks: TaskEntity[]
}
