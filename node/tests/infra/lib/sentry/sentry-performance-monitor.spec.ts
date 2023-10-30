import * as Sentry from '@sentry/node'
import { SentryPerformanceMonitor } from '@/infra/lib/sentry'

jest.mock('@sentry/node', () => ({
  startTransaction: jest.fn().mockReturnValue({
    setStatus: jest.fn(),
    finish: jest.fn(),
  }),
  configureScope: jest.fn().mockImplementation(callback1 => {
    callback1({ setSpan: jest.fn() })
  }),
}))

const makeSut = (): SentryPerformanceMonitor => {
  return new SentryPerformanceMonitor()
}

const transactionParamsMock = {
  name: 'GET /api/',
  operation: 'controller',
}

describe('SentryPerformanceMonitor', () => {
  it('should start a transaction', async () => {
    const sentryPerformance = makeSut()
    const startSpy = jest.spyOn(Sentry, 'startTransaction')
    const configureScopeSpy = jest.spyOn(Sentry, 'configureScope')
    await sentryPerformance.start(transactionParamsMock)

    expect(startSpy).toBeCalledWith({
      name: transactionParamsMock.name,
      op: transactionParamsMock.operation,
    })

    expect(configureScopeSpy).toBeCalledTimes(1)
  })

  it('should finish a transaction with status', async () => {
    const sentryPerformance = makeSut()
    const setStatusSpy = jest.spyOn(Sentry.startTransaction({ name: '' }), 'setStatus')

    const finishSpy = jest.spyOn(Sentry.startTransaction({ name: '' }), 'finish')
    await sentryPerformance.start(transactionParamsMock)
    await sentryPerformance.finish({ status: 'ok' })

    expect(setStatusSpy).toBeCalledWith('ok')
    expect(finishSpy).toBeCalled()
  })
})
