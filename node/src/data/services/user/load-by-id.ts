import { LoadUserById } from '@/domain/usecases/user'
import { LoadUserByIdRepository } from '@/data/protocols/repository/user'
import { UserNotFoundError } from '@/domain/errors/user'

export class LoadUserByIdService implements LoadUserById {
  constructor(private readonly loadUserByIdRepository: LoadUserByIdRepository) {}

  async load({ user_id }: LoadUserById.Params): Promise<LoadUserById.Result> {
    const user = await this.loadUserByIdRepository.loadById({ id: user_id })
    if (!user) {
      throw new UserNotFoundError()
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cellphone: user.cellphone,
      avatar: user.avatar,
      gender: user.gender,
    }
  }
}
