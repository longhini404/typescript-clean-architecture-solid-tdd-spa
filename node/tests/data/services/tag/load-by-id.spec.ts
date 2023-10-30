import { LoadTagByIdService } from '@/data/services/tag'
import { TagNotFoundError } from '@/domain/errors/tag'
import { LoadTagByIdRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: LoadTagByIdService
  loadTagByIdRepositoryStub: LoadTagByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadTagByIdRepositoryStub = new LoadTagByIdRepositoryStub()
  const sut = new LoadTagByIdService(loadTagByIdRepositoryStub)
  return {
    sut,
    loadTagByIdRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  tag_id: 1,
})

describe('LoadTagById Service', () => {
  it('Should call LoadTagById with correct value', async () => {
    const { sut, loadTagByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadTagByIdSpy = jest.spyOn(loadTagByIdRepositoryStub, 'loadById')
    await sut.load(makeFakeRequest)
    expect(loadTagByIdSpy).toHaveBeenCalledWith({
      id: makeFakeRequest.tag_id,
    })
  })

  it('Should throw if tag is not found', async () => {
    const { sut, loadTagByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTagByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.load(makeFakeRequest)
    await expect(promise).rejects.toThrow(new TagNotFoundError())
  })
})
