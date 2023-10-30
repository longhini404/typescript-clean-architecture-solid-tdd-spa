import { getManager } from 'typeorm'
import {
  CreateUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  UpdateUserRepository,
  DeleteUserRepository,
  ListUsersRepository,
} from '@/data/protocols/repository/user'
import { UserEntity } from '@/infra/db/postgres/entities'

export class PostgresUserRepository
  implements
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    CreateUserRepository,
    UpdateUserRepository,
    DeleteUserRepository,
    ListUsersRepository
{
  async loadByEmail({
    email,
  }: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
    const repository = getManager().getRepository(UserEntity)
    const response = await repository.findOne({ email })
    return response && response
  }

  async loadById({ id }: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
    const repository = getManager().getRepository(UserEntity)
    const response = await repository.findOne({ id })
    return response && response
  }

  async create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const repository = getManager().getRepository(UserEntity)
    const response = await repository.save(params)
    return {
      id: response.id,
    }
  }

  async update({ user_id, informations_to_update }: UpdateUserRepository.Params): Promise<void> {
    const repository = getManager().getRepository(UserEntity)
    await repository.update(
      {
        id: user_id,
      },
      informations_to_update
    )
  }

  async delete({ user_id }: DeleteUserRepository.Params): Promise<void> {
    const repository = getManager().getRepository(UserEntity)
    await repository.delete({ id: user_id })
  }

  async load(params: ListUsersRepository.Params): Promise<ListUsersRepository.Result> {
    const repository = getManager().getRepository(UserEntity)
    const [result, total] = await repository.findAndCount({
      where: { status: 1 },
      skip: (params.page - 1) * params.items,
      take: params.items,
    })
    const users = result.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      cellphone: user.cellphone,
      avatar: user.avatar,
      gender: user.gender,
    }))
    return {
      users,
      pagination: {
        total,
        page: params.page,
        items: params.items,
      },
    }
  }
}
