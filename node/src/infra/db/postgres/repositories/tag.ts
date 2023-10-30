import { getManager } from 'typeorm'
import {
  CreateTagRepository,
  DeleteTagRepository,
  ListTagsRepository,
  LoadTagByIdRepository,
  LoadTagByTitleRepository,
  UpdateTagRepository,
} from '@/data/protocols/repository/tag'
import { TagEntity, TaskTagEntity } from '@/infra/db/postgres/entities'

export class PostgresTagRepository
  implements
    CreateTagRepository,
    DeleteTagRepository,
    ListTagsRepository,
    LoadTagByIdRepository,
    LoadTagByTitleRepository,
    UpdateTagRepository
{
  async create(params: CreateTagRepository.Params): Promise<CreateTagRepository.Result> {
    const repository = getManager().getRepository(TagEntity)
    const response = await repository.save(params)
    return {
      id: response.id,
    }
  }

  async delete({ tag_id }: DeleteTagRepository.Params): Promise<void> {
    const entityManager = getManager()

    await entityManager
      .createQueryBuilder()
      .delete()
      .from(TaskTagEntity)
      .where('tagId = :tag_id', { tag_id })
      .execute()

    await entityManager
      .createQueryBuilder()
      .delete()
      .from(TagEntity)
      .where('id = :tag_id', { tag_id })
      .execute()
  }

  async load(params: ListTagsRepository.Params): Promise<ListTagsRepository.Result> {
    const repository = getManager().getRepository(TagEntity)
    const [result, total] = await repository.findAndCount({
      skip: (params.page - 1) * params.items,
      take: params.items,
    })
    const tags = result.map(tag => ({
      id: tag.id,
      title: tag.title,
    }))
    return {
      tags,
      pagination: {
        total,
        page: params.page,
        items: params.items,
      },
    }
  }

  async loadById({
    id: tag_id,
  }: LoadTagByIdRepository.Params): Promise<LoadTagByIdRepository.Result> {
    const repository = getManager().getRepository(TagEntity)
    const response = await repository.findOne({ id: tag_id })
    return response && response
  }

  async loadByTitle({
    title,
  }: LoadTagByTitleRepository.Params): Promise<LoadTagByTitleRepository.Result> {
    const repository = getManager().getRepository(TagEntity)
    const response = await repository.findOne({ title })
    return response && response
  }

  async update({ tag_id, information_to_update }: UpdateTagRepository.Params): Promise<void> {
    const repository = getManager().getRepository(TagEntity)

    await repository.update({ id: tag_id }, information_to_update)
  }
}
