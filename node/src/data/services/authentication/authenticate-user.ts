import { AuthenticateUser } from '@/domain/usecases/authentication'
import { LoadUserByEmailRepository } from '@/data/protocols/repository/user'
import { Encrypter, HashCompare } from '@/data/protocols/cryptography'

export class AuthenticateUserService implements AuthenticateUser {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter
  ) {}

  async auth({ login, password }: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const userInformations = await this.loadUserByEmailRepository.loadByEmail({
      email: login,
    })
    if (!userInformations) {
      return {
        access_token: null,
        profile: null,
      }
    }
    const isValidPassword = await this.hashCompare.compare({
      incoming_password: password,
      storaged_password: userInformations.password,
    })
    if (!isValidPassword) {
      return {
        access_token: null,
        profile: null,
      }
    }
    const accessToken = await this.encrypter.encrypt({ login: userInformations.email })
    return {
      access_token: accessToken,
      profile: {
        name: userInformations.name,
        email: userInformations.email,
        cellphone: userInformations.cellphone,
        avatar: userInformations.avatar,
      },
    }
  }
}
