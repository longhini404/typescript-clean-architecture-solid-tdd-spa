import { MonitorError } from '@/data/protocols/monitoring'
import { SentryMonitorError } from '@/infra/lib/sentry'
import * as Sentry from '@sentry/node'

jest.mock('@sentry/node', () => ({
  captureException: jest.fn(),
}))

const makeSut = (): MonitorError => {
  return new SentryMonitorError()
}

describe('SentryMonitorError', () => {
  it('should call sentry captureException', async () => {
    const sentryMonitor = makeSut()
    const sentrySpy = jest.spyOn(Sentry, 'captureException')

    const error = new Error('')
    await sentryMonitor.capture({ error })
    expect(sentrySpy).toBeCalledWith(error)
  })
})
