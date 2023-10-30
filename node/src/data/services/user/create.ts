import { stayOnlyNumbers } from '@/utils'
import { CreateUser } from '@/domain/usecases/user'
import { CreateUserRepository, LoadUserByEmailRepository } from '@/data/protocols/repository/user'
import { Hash } from '@/data/protocols/cryptography'
import { UserAlreadyRegisteredError } from '@/domain/errors/user'

export class CreateUserService implements CreateUser {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly bcryptAdapter: Hash,
    private readonly createUserRepository: CreateUserRepository
  ) {}

  async create(params: CreateUser.Params): Promise<CreateUser.Result> {
    const { name, email, password, cellphone, avatar, gender, status } = params
    const userFound = await this.loadUserByEmailRepository.loadByEmail({ email })
    if (userFound) {
      throw new UserAlreadyRegisteredError()
    }
    const passwordHash = await this.bcryptAdapter.hash({ password })
    const userAccountId = await this.createUserRepository.create({
      name,
      email,
      password: passwordHash,
      cellphone: stayOnlyNumbers(cellphone),
      avatar,
      gender,
      status,
    })
    return userAccountId
  }
}
