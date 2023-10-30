import { CreateUser, DeleteUser, ListUsers, LoadUserById, UpdateUser } from '@/domain/usecases/user'

const fakeUser = {
  name: 'any_name',
  password: 'any_password',
  email: 'any_email@anydomain.com',
  cellphone: '9999999999999',
  gender: 'F',
  status: 1,
}

export class CreateUserStub implements CreateUser {
  result = {
    id: 1,
  }

  async create(params: CreateUser.Params): Promise<CreateUser.Result> {
    return this.result
  }
}

export class UpdateUserStub implements UpdateUser {
  async update(params: UpdateUser.Params): Promise<void> {}
}

export class DeleteUserStub implements DeleteUser {
  async delete(params: DeleteUser.Params): Promise<void> {}
}

export class ListUsersStub implements ListUsers {
  result = {
    users: [fakeUser],
    pagination: {
      total: 1,
      page: 1,
      items: 10,
    },
  }

  async load(params: ListUsers.Params): Promise<ListUsers.Result> {
    return this.result
  }
}

export class LoadUserByIdStub implements LoadUserById {
  result = fakeUser

  async load(params: LoadUserById.Params): Promise<LoadUserById.Result> {
    return this.result
  }
}
