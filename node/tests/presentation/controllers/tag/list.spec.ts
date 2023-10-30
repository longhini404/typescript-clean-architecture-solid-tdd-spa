import { HttpRequest } from '@/presentation/protocols'
import { success } from '@/presentation/helpers'
import { ListTagsController } from '@/presentation/controllers/tag'
import { ListTagsStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: ListTagsController
  listTagsStub: ListTagsStub
}

const makeSut = (): SutTypes => {
  const listTagsStub = new ListTagsStub()
  const sut = new ListTagsController(listTagsStub)
  return {
    sut,
    listTagsStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  query: {
    page: 1,
    items: 10,
  },
})

describe('ListTagsController', () => {
  it('Should call ListTags with correct values', async () => {
    const { sut, listTagsStub } = makeSut()
    const listTagsSpy = jest.spyOn(listTagsStub, 'load')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(listTagsSpy).toHaveBeenCalledWith({
      page: request.query.page,
      items: request.query.items,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut, listTagsStub } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(
      success({
        tags: listTagsStub.result.tags,
        pagination: listTagsStub.result.pagination,
      })
    )
  })

  it('Should return noContent on success even without receiving pagination information', async () => {
    const { sut, listTagsStub } = makeSut()
    const httpRequest = await sut.handle({
      query: {},
    })
    expect(httpRequest).toEqual(
      success({
        tags: listTagsStub.result.tags,
        pagination: listTagsStub.result.pagination,
      })
    )
  })
})
