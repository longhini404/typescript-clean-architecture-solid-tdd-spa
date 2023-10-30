import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { TagEntity } from './tag-entity'

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar' })
  description: string

  @Column({ type: 'varchar' })
  dateTime: string

  @Column({ type: 'varchar' })
  duration: string

  @ManyToMany(() => TagEntity, tag => tag.tasks)
  @JoinTable({ name: 'task_tag' })
  tags: TagEntity[]
}
