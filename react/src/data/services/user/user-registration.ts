import { api } from 'core/services'
import { UserRegistration } from 'domain/interfaces/user'

export class UserRegistrationService implements UserRegistration {
  async create(user: UserRegistration.Params): Promise<void> {
    await api.post(`/user/create`, user)
  }
}
