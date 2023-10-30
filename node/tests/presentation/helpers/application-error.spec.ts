import { QueryFailedError } from 'typeorm'
import { DomainError } from '@/domain/errors/domain-error'
import { DatabaseConnection } from '@/domain/errors/generic'
import { badRequest, ApplicationError, serverError, notFound } from '@/presentation/helpers'
import { MonitorErrorStub } from '@/tests/data/mocks'

type SutTypes = {
  sut: ApplicationError
  monitorError: MonitorErrorStub
}

const makeSut = (error: Error): SutTypes => {
  const monitorError = new MonitorErrorStub()
  const sut = new ApplicationError(error, monitorError)

  return {
    sut,
    monitorError,
  }
}

describe('makeApplicationError', () => {
  it('should return server error', () => {
    const error = new Error('new generic error')
    const { sut, monitorError } = makeSut(error)

    const monitorSpy = jest.spyOn(monitorError, 'capture')

    const httpResponse = sut.handle()
    expect(httpResponse).toEqual(serverError(error))
    expect(monitorSpy).toBeCalledWith({ error })
  })

  it('should return bad request error', () => {
    const error = new DomainError('new specific error')
    const { sut, monitorError } = makeSut(error)

    const monitorSpy = jest.spyOn(monitorError, 'capture')

    const httpResponse = sut.handle()
    expect(httpResponse).toEqual(badRequest(error))
    expect(monitorSpy).toBeCalled()
  })

  it('should return not found error', () => {
    const error = new DomainError('new specific error')
    error.statusCode = 404

    const { sut, monitorError } = makeSut(error)

    const monitorSpy = jest.spyOn(monitorError, 'capture')

    const httpResponse = sut.handle()
    expect(httpResponse).toEqual(notFound(error))
    expect(monitorSpy).toBeCalled()
  })

  it('should return serverError error', () => {
    const error = new QueryFailedError('', [], '')
    const { sut, monitorError } = makeSut(error)

    const monitorSpy = jest.spyOn(monitorError, 'capture')

    const httpResponse = sut.handle()
    expect(httpResponse).toEqual(serverError(new DatabaseConnection()))
    expect(monitorSpy).toBeCalledWith({ error })
  })
})
