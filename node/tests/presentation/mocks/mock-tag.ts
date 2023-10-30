import { CreateTag, DeleteTag, ListTags, LoadTagById, UpdateTag } from '@/domain/usecases/tag'

const fakeTag = {
  title: 'Sample Tag',
}

export class CreateTagStub implements CreateTag {
  result = {
    id: 1,
  }

  async create(params: CreateTag.Params): Promise<CreateTag.Result> {
    return this.result
  }
}

export class DeleteTagStub implements DeleteTag {
  async delete(params: DeleteTag.Params): Promise<void> {}
}

export class ListTagsStub implements ListTags {
  result = {
    tags: [fakeTag],
    pagination: {
      total: 1,
      page: 1,
      items: 10,
    },
  }

  async load(params: ListTags.Params): Promise<ListTags.Result> {
    return this.result
  }
}

export class LoadTagByIdStub implements LoadTagById {
  result = fakeTag

  async load(params: LoadTagById.Params): Promise<LoadTagById.Result> {
    return this.result
  }
}

export class UpdateTagStub implements UpdateTag {
  async update(params: UpdateTag.Params): Promise<void> {}
}
