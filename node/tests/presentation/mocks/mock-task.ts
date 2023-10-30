import { CreateTask, DeleteTask, ListTasks, LoadTaskById, UpdateTask } from '@/domain/usecases/task'

const fakeTask = {
  title: 'Sample Task',
  description: 'A sample task description.',
  dateTime: '2023-10-30T08:00:00',
  duration: '2 hours',
}

export class CreateTaskStub implements CreateTask {
  result = {
    id: 1,
  }

  async create(params: CreateTask.Params): Promise<CreateTask.Result> {
    return this.result
  }
}

export class DeleteTaskStub implements DeleteTask {
  async delete(params: DeleteTask.Params): Promise<void> {}
}

export class ListTasksStub implements ListTasks {
  result = {
    tasks: [fakeTask],
    pagination: {
      total: 1,
      page: 1,
      items: 10,
    },
  }

  async load(params: ListTasks.Params): Promise<ListTasks.Result> {
    return this.result
  }
}

export class LoadTaskByIdStub implements LoadTaskById {
  result = fakeTask

  async load(params: LoadTaskById.Params): Promise<LoadTaskById.Result> {
    return this.result
  }
}

export class UpdateTaskStub implements UpdateTask {
  async update(params: UpdateTask.Params): Promise<void> {}
}
