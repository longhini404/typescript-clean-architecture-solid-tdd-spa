import { api } from 'core/services'
import { Authentication } from 'domain/interfaces/authentication'
import { useDispatch } from 'react-redux'
import { signInRequest } from 'core/store/modules/auth/actions'

export class AuthenticationService implements Authentication {
  dispatch = useDispatch()
  async auth({ login, password }: Authentication.Params): Promise<void> {
    this.dispatch(signInRequest(login, password))
  }
}
