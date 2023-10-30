import { UpdateUser } from '@/domain/usecases/user'
import { UpdateUserRepository, LoadUserByIdRepository } from '@/data/protocols/repository/user'
import { UserNotFoundError } from '@/domain/errors/user'

export class UpdateUserService implements UpdateUser {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly updateUserRepository: UpdateUserRepository
  ) {}

  async update({ user_id, informations_to_update }: UpdateUser.Params): Promise<void> {
    const userFound = await this.loadUserByIdRepository.loadById({ id: user_id })
    if (!userFound) {
      throw new UserNotFoundError()
    }
    await this.updateUserRepository.update({
      user_id,
      informations_to_update,
    })
  }
}
