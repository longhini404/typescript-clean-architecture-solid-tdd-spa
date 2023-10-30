import { UpdateTagService } from '@/data/services/tag'
import { TagNotFoundError } from '@/domain/errors/tag'
import { LoadTagByIdRepositoryStub, UpdateTagRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: UpdateTagService
  loadTagByIdRepositoryStub: LoadTagByIdRepositoryStub
  updateTagRepositoryStub: UpdateTagRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadTagByIdRepositoryStub = new LoadTagByIdRepositoryStub()
  const updateTagRepositoryStub = new UpdateTagRepositoryStub()
  const sut = new UpdateTagService(loadTagByIdRepositoryStub, updateTagRepositoryStub)
  return {
    sut,
    loadTagByIdRepositoryStub,
    updateTagRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  tag_id: 1,
  information_to_update: {
    title: 'Sample Tag',
  },
})

describe('UpdateTag Service', () => {
  it('Should call LoadTagById with correct value', async () => {
    const { sut, loadTagByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadTagByIdSpy = jest.spyOn(loadTagByIdRepositoryStub, 'loadById')
    await sut.update(makeFakeRequest)
    expect(loadTagByIdSpy).toHaveBeenCalledWith({
      id: makeFakeRequest.tag_id,
    })
  })

  it('Should call UpdateTag with correct value', async () => {
    const { sut, updateTagRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const updateTagSpy = jest.spyOn(updateTagRepositoryStub, 'update')
    await sut.update(makeFakeRequest)
    expect(updateTagSpy).toHaveBeenCalledWith({
      tag_id: makeFakeRequest.tag_id,
      information_to_update: makeFakeRequest.information_to_update,
    })
  })

  it('Should throw if tag is not found', async () => {
    const { sut, loadTagByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTagByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.update(makeFakeRequest)
    await expect(promise).rejects.toThrow(new TagNotFoundError())
  })
})
