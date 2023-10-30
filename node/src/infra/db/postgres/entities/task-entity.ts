import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}
