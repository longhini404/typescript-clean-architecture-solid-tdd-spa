import { getManager } from 'typeorm'
import {
  CreateTaskRepository,
  DeleteTaskRepository,
  ListTasksRepository,
  LoadTaskByIdRepository,
  LoadTaskByTitleRepository,
  UpdateTaskRepository,
} from '@/data/protocols/repository/task'
import { TaskEntity, TaskTagEntity } from '@/infra/db/postgres/entities'

export class PostgresTaskRepository
  implements
    CreateTaskRepository,
    DeleteTaskRepository,
    ListTasksRepository,
    LoadTaskByIdRepository,
    LoadTaskByTitleRepository,
    UpdateTaskRepository
{
  async create(params: CreateTaskRepository.Params): Promise<CreateTaskRepository.Result> {
    const taskRepository = getManager().getRepository(TaskEntity)
    const taskTagRepository = getManager().getRepository(TaskTagEntity)

    const task = taskRepository.create({
      title: params.title,
      description: params.description,
      dateTime: params.dateTime,
      duration: params.duration,
    })

    const savedTask = await taskRepository.save(task)
    const taskId = savedTask.id

    const taskTags = params.tags.map(tag => ({
      task: savedTask,
      tag: tag.value,
    }))

    await taskTagRepository.save(taskTags)

    return {
      id: taskId,
    }
  }

  async delete({ task_id }: DeleteTaskRepository.Params): Promise<void> {
    const entityManager = getManager()

    await entityManager
      .createQueryBuilder()
      .delete()
      .from(TaskTagEntity)
      .where('taskId = :task_id', { task_id })
      .execute()

    await entityManager
      .createQueryBuilder()
      .delete()
      .from(TaskEntity)
      .where('id = :task_id', { task_id })
      .execute()
  }

  async load(params: ListTasksRepository.Params): Promise<ListTasksRepository.Result> {
    const repository = getManager().getRepository(TaskEntity)
    const [result, total] = await repository.findAndCount({
      skip: (params.page - 1) * params.items,
      take: params.items,
      relations: ['tags'],
    })
    const tasks = result.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      dateTime: task.dateTime,
      duration: task.duration,
      tags: task.tags,
    }))
    return {
      tasks,
      pagination: {
        total,
        page: params.page,
        items: params.items,
      },
    }
  }

  async loadById({
    id: task_id,
  }: LoadTaskByIdRepository.Params): Promise<LoadTaskByIdRepository.Result> {
    const repository = getManager().getRepository(TaskEntity)
    const response = await repository.findOne({ id: task_id })
    return response && response
  }

  async loadByTitle({
    title,
  }: LoadTaskByTitleRepository.Params): Promise<LoadTaskByTitleRepository.Result> {
    const repository = getManager().getRepository(TaskEntity)
    const response = await repository.findOne({ title })
    return response && response
  }

  async update({ task_id, information_to_update }: UpdateTaskRepository.Params): Promise<void> {
    const taskRepository = getManager().getRepository(TaskEntity)
    const taskTagRepository = getManager().getRepository(TaskTagEntity)

    const task = await taskRepository.findOne(task_id)

    if (information_to_update.title) {
      task.title = information_to_update.title
    }
    if (information_to_update.description) {
      task.description = information_to_update.description
    }
    if (information_to_update.dateTime) {
      task.dateTime = information_to_update.dateTime
    }
    if (information_to_update.duration) {
      task.duration = information_to_update.duration
    }

    if (information_to_update.tags) {
      const tagIds = information_to_update.tags.map(tag => tag.value)

      await taskTagRepository.delete({ task })

      const taskTagPromises = tagIds.map(tagId => taskTagRepository.save({ task, tag: tagId }))
      await Promise.all(taskTagPromises)
    }

    await taskRepository.save(task)
  }
}
