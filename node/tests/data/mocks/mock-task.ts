import {
  CreateTaskRepository,
  DeleteTaskRepository,
  ListTasksRepository,
  LoadTaskByIdRepository,
  LoadTaskByTitleRepository,
  UpdateTaskRepository,
} from '@/data/protocols/repository/task'

export const makeTaskMock = (): any => ({
  title: 'Sample Task',
  description: 'A sample task description.',
  dateTime: '2023-10-30T08:00:00',
  duration: '2 hours',
})

export class CreateTaskRepositoryStub implements CreateTaskRepository {
  result = 1

  async create(params: CreateTaskRepository.Params): Promise<CreateTaskRepository.Result> {
    return {
      id: this.result,
    }
  }
}

export class DeleteTaskRepositoryStub implements DeleteTaskRepository {
  async delete(params: DeleteTaskRepository.Params): Promise<void> {}
}

export class ListTasksRepositoryStub implements ListTasksRepository {
  result = {
    tasks: [makeTaskMock()],
    pagination: {
      total: 1,
      page: 1,
      items: 10,
    },
  }

  async load(params: ListTasksRepository.Params): Promise<ListTasksRepository.Result> {
    return this.result
  }
}

export class LoadTaskByIdRepositoryStub implements LoadTaskByIdRepository {
  result = makeTaskMock()

  async loadById(params: LoadTaskByIdRepository.Params): Promise<LoadTaskByIdRepository.Result> {
    return this.result
  }
}

export class LoadTaskByTitleRepositoryStub implements LoadTaskByTitleRepository {
  result = makeTaskMock()

  async loadByTitle(
    params: LoadTaskByTitleRepository.Params
  ): Promise<LoadTaskByTitleRepository.Result> {
    return this.result
  }
}

export class UpdateTaskRepositoryStub implements UpdateTaskRepository {
  async update(params: UpdateTaskRepository.Params): Promise<void> {}
}
