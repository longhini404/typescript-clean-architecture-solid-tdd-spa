import { getManager } from 'typeorm'
import {
  CreateTaskRepository,
  DeleteTaskRepository,
  ListTasksRepository,
  LoadTaskByIdRepository,
  LoadTaskByTitleRepository,
  UpdateTaskRepository,
} from '@/data/protocols/repository/task'
import { TaskEntity } from '@/infra/db/postgres/entities'

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
    const repository = getManager().getRepository(TaskEntity)
    const response = await repository.save(params)
    return {
      id: response.id,
    }
  }

  async delete({ task_id }: DeleteTaskRepository.Params): Promise<void> {
    const repository = getManager().getRepository(TaskEntity)
    await repository.delete({ id: task_id })
  }

  async load(params: ListTasksRepository.Params): Promise<ListTasksRepository.Result> {
    const repository = getManager().getRepository(TaskEntity)
    const [result, total] = await repository.findAndCount({
      skip: (params.page - 1) * params.items,
      take: params.items,
    })
    const tasks = result.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      dateTime: task.dateTime,
      duration: task.duration,
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
    const repository = getManager().getRepository(TaskEntity)
    await repository.update(
      {
        id: task_id,
      },
      information_to_update
    )
  }
}
