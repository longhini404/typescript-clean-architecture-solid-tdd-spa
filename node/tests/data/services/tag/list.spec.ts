import { ListTagsService } from '@/data/services/tag'
import { ListTagsRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: ListTagsService
  listTagsRepositoryStub: ListTagsRepositoryStub
}

const makeSut = (): SutTypes => {
  const listTagsRepositoryStub = new ListTagsRepositoryStub()
  const sut = new ListTagsService(listTagsRepositoryStub)
  return {
    sut,
    listTagsRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  page: 1,
  items: 10,
})

describe('ListTags Service', () => {
  it('Should call ListTags with correct value', async () => {
    const { sut, listTagsRepositoryStub } = makeSut()
    const listTagsSpy = jest.spyOn(listTagsRepositoryStub, 'load')
    const makeFakeRequest = makeFakeRequestParams()
    await sut.load(makeFakeRequest)
    expect(listTagsSpy).toHaveBeenCalledWith({
      page: makeFakeRequest.page,
      items: makeFakeRequest.items,
    })
  })
})
