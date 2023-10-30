import { DeleteUser } from '@/domain/usecases/user'
import { DeleteUserRepository, LoadUserByIdRepository } from '@/data/protocols/repository/user'
import { UserNotFoundError } from '@/domain/errors/user'

export class DeleteUserService implements DeleteUser {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly deleteUserRepository: DeleteUserRepository
  ) {}

  async delete({ user_id }: DeleteUser.Params): Promise<void> {
    const userFound = await this.loadUserByIdRepository.loadById({ id: user_id })
    if (!userFound) {
      throw new UserNotFoundError()
    }
    await this.deleteUserRepository.delete({ user_id })
  }
}
