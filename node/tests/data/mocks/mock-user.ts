import {
  CreateUserRepository,
  DeleteUserRepository,
  ListUsersRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  UpdateUserRepository,
} from '@/data/protocols/repository/user'
import { Hash } from '@/data/protocols/cryptography'

export const makeUserMock = (): any => ({
  name: 'any_name',
  email: 'any_email@anydomain.com',
  cellphone: '9999999999999',
  password: 'any_password',
  gender: 'M',
  status: 1,
  avatar: 'https://anyurl.com/anyimage.jpg',
})

export class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
  result = makeUserMock()

  async loadByEmail(
    params: LoadUserByEmailRepository.Params
  ): Promise<LoadUserByEmailRepository.Result> {
    return this.result
  }
}

export class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
  result = makeUserMock()

  async loadById(params: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
    return this.result
  }
}

export class BcryptAdapterStub implements Hash {
  result = 'any_hashed_password'
  async hash(params: Hash.Params): Promise<Hash.Result> {
    return this.result
  }
}

export class CreateUserRepositoryStub implements CreateUserRepository {
  result = 1
  async create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    return {
      id: this.result,
    }
  }
}

export class UpdateUserRepositoryStub implements UpdateUserRepository {
  async update(params: UpdateUserRepository.Params): Promise<void> {}
}

export class DeleteUserRepositoryStub implements DeleteUserRepository {
  async delete(params: DeleteUserRepository.Params): Promise<void> {}
}

export class ListUsersRepositoryStub implements ListUsersRepository {
  result = {
    users: [makeUserMock()],
    pagination: {
      total: 1,
      page: 1,
      items: 10,
    },
  }

  async load(params: ListUsersRepository.Params): Promise<ListUsersRepository.Result> {
    return this.result
  }
}
