import { CreateTagService } from '@/data/services/tag/create'
import { TagAlreadyRegisteredError } from '@/domain/errors/tag'
import { LoadTagByTitleRepositoryStub, CreateTagRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: CreateTagService
  loadTagByTitleRepositoryStub: LoadTagByTitleRepositoryStub
  createTagRepositoryStub: CreateTagRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadTagByTitleRepositoryStub = new LoadTagByTitleRepositoryStub()
  const createTagRepositoryStub = new CreateTagRepositoryStub()
  const sut = new CreateTagService(createTagRepositoryStub, loadTagByTitleRepositoryStub)
  return {
    sut,
    loadTagByTitleRepositoryStub,
    createTagRepositoryStub,
  }
}

export const makeFakeTagRequest = (): any => ({
  title: 'Sample Tag',
})

describe('CreateTag Service', () => {
  it('Should call LoadTagByTitle with correct value', async () => {
    const { sut, loadTagByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadTagByTitleRepositoryStub, 'loadByTitle').mockResolvedValueOnce(null)
    const fakeTagRequest = makeFakeTagRequest()
    const loadTagByTitleSpy = jest.spyOn(loadTagByTitleRepositoryStub, 'loadByTitle')
    await sut.create(fakeTagRequest)
    expect(loadTagByTitleSpy).toHaveBeenCalledWith({
      title: fakeTagRequest.title,
    })
  })

  it('Should call CreateTag with correct value', async () => {
    const { sut, createTagRepositoryStub, loadTagByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadTagByTitleRepositoryStub, 'loadByTitle').mockResolvedValueOnce(null)
    const fakeTagRequest = makeFakeTagRequest()
    const createTagSpy = jest.spyOn(createTagRepositoryStub, 'create')
    await sut.create(fakeTagRequest)
    expect(createTagSpy).toHaveBeenCalledWith(fakeTagRequest)
  })

  it('Should return correct value on CreateTag', async () => {
    const { sut, createTagRepositoryStub, loadTagByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadTagByTitleRepositoryStub, 'loadByTitle').mockResolvedValueOnce(null)
    const fakeTagRequest = makeFakeTagRequest()
    const createdTag = await sut.create(fakeTagRequest)
    expect(createdTag).toEqual({ id: createTagRepositoryStub.result })
  })

  it('Should throw error when LoadTagByTitleRepository returns a tag', async () => {
    const { sut, loadTagByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadTagByTitleRepositoryStub, 'loadByTitle').mockResolvedValueOnce({
      title: 'Sample Tag',
    })
    const fakeTagRequest = makeFakeTagRequest()
    const promise = sut.create(fakeTagRequest)
    expect(promise).rejects.toThrow(new TagAlreadyRegisteredError())
  })
})
