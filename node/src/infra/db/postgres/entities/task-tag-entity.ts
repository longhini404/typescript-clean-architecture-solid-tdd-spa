import { Entity, ManyToOne, JoinColumn } from 'typeorm'
import { TaskEntity } from './task-entity'
import { TagEntity } from './tag-entity'

@Entity({ name: 'task_tag' })
export class TaskTagEntity {
  @ManyToOne(() => TaskEntity, task => task.tags, { primary: true })
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity

  @ManyToOne(() => TagEntity, tag => tag.tasks, { primary: true })
  @JoinColumn({ name: 'tagId' })
  tag: TagEntity
}
