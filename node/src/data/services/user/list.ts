import { ListUsers } from '@/domain/usecases/user'
import { ListUsersRepository } from '@/data/protocols/repository/user'

export class ListUsersService implements ListUsers {
  constructor(private readonly listUsersRepository: ListUsersRepository) {}

  async load(params: ListUsers.Params): Promise<ListUsers.Result> {
    return await this.listUsersRepository.load(params)
  }
}
