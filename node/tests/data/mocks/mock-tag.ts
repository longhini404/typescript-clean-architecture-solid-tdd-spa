import {
  CreateTagRepository,
  DeleteTagRepository,
  ListTagsRepository,
  LoadTagByIdRepository,
  LoadTagByTitleRepository,
  UpdateTagRepository,
} from '@/data/protocols/repository/tag'

export const makeTagMock = (): any => ({
  title: 'Sample Tag',
})

export class CreateTagRepositoryStub implements CreateTagRepository {
  result = 1

  async create(params: CreateTagRepository.Params): Promise<CreateTagRepository.Result> {
    return {
      id: this.result,
    }
  }
}

export class DeleteTagRepositoryStub implements DeleteTagRepository {
  async delete(params: DeleteTagRepository.Params): Promise<void> {}
}

export class ListTagsRepositoryStub implements ListTagsRepository {
  result = {
    tags: [makeTagMock()],
    pagination: {
      total: 1,
      page: 1,
      items: 10,
    },
  }

  async load(params: ListTagsRepository.Params): Promise<ListTagsRepository.Result> {
    return this.result
  }
}

export class LoadTagByIdRepositoryStub implements LoadTagByIdRepository {
  result = makeTagMock()

  async loadById(params: LoadTagByIdRepository.Params): Promise<LoadTagByIdRepository.Result> {
    return this.result
  }
}

export class LoadTagByTitleRepositoryStub implements LoadTagByTitleRepository {
  result = makeTagMock()

  async loadByTitle(
    params: LoadTagByTitleRepository.Params
  ): Promise<LoadTagByTitleRepository.Result> {
    return this.result
  }
}

export class UpdateTagRepositoryStub implements UpdateTagRepository {
  async update(params: UpdateTagRepository.Params): Promise<void> {}
}
