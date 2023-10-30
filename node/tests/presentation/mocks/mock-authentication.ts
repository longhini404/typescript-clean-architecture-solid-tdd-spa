import { AuthenticateUser, VerifyToken } from '@/domain/usecases/authentication'

export class AuthenticationStub implements AuthenticateUser {
  result = {
    access_token: 'any_acess_token',
    profile: {
      name: 'any_name',
      email: 'any_email@anydomain.com',
      cellphone: '9999999999999',
      password: 'any_password',
      gender: 'M',
      status: 1,
      avatar: 'https://anyurl.com/anyimage.jpg',
    },
  }

  async auth(params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    return this.result
  }
}

export class VerifyTokenStub implements VerifyToken {
  result = {
    email: 'any_email@anydomain.com',
  }

  async verify(params: VerifyToken.Params): Promise<VerifyToken.Result> {
    return this.result
  }
}
