import { DeleteTagService } from '@/data/services/tag'
import { TagNotFoundError } from '@/domain/errors/tag'
import { LoadTagByIdRepositoryStub, DeleteTagRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: DeleteTagService
  loadTagByIdRepositoryStub: LoadTagByIdRepositoryStub
  deleteTagRepositoryStub: DeleteTagRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadTagByIdRepositoryStub = new LoadTagByIdRepositoryStub()
  const deleteTagRepositoryStub = new DeleteTagRepositoryStub()
  const sut = new DeleteTagService(loadTagByIdRepositoryStub, deleteTagRepositoryStub)
  return {
    sut,
    loadTagByIdRepositoryStub,
    deleteTagRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  id: 1,
})

describe('DeleteTag Service', () => {
  it('Should call LoadTagById with correct value', async () => {
    const { sut, loadTagByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadTagByIdSpy = jest.spyOn(loadTagByIdRepositoryStub, 'loadById')
    await sut.delete(makeFakeRequest)
    expect(loadTagByIdSpy).toHaveBeenCalledWith({
      tag_id: makeFakeRequest.tag_id,
    })
  })

  it('Should call deleteTag with correct value', async () => {
    const { sut, deleteTagRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const deleteTagSpy = jest.spyOn(deleteTagRepositoryStub, 'delete')
    await sut.delete(makeFakeRequest)
    expect(deleteTagSpy).toHaveBeenCalledWith({
      tag_id: makeFakeRequest.tag_id,
    })
  })

  it('Should throw if tag is not found', async () => {
    const { sut, loadTagByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTagByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.delete(makeFakeRequest)
    await expect(promise).rejects.toThrow(new TagNotFoundError())
  })
})
