import { PerformanceMonitorDecorator } from '@/presentation/decorator'
import { ControllerStub } from '@/tests/presentation/mocks'
import { PerformanceMonitorStub } from '@/tests/data/mocks'

const mockFakeRequest = (): any => ({
  body: {
    data: 'any_data',
  },
})

type SutTypes = {
  sut: PerformanceMonitorDecorator
  controllerStub: ControllerStub
  performanceMonitorStub: PerformanceMonitorStub
}

const performanceParams = {
  name: 'GET /api/test',
  operation: 'controller',
}

const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub()
  const performanceMonitorStub = new PerformanceMonitorStub()
  const sut = new PerformanceMonitorDecorator(
    performanceParams.name,
    performanceParams.operation,
    controllerStub,
    performanceMonitorStub
  )
  return {
    sut,
    controllerStub,
    performanceMonitorStub,
  }
}

describe('PerformanceMonitor', () => {
  it('Should call controller with correct values', async () => {
    const { sut, controllerStub } = makeSut()
    const constrollerSpy = jest.spyOn(controllerStub, 'handle')
    const request = mockFakeRequest()
    await sut.handle(request)
    expect(constrollerSpy).toHaveBeenCalledWith(request)
  })

  it('Should throw if controller throws', async () => {
    const { sut, controllerStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockRejectedValueOnce(() => {
      throw new Error()
    })
    const httpResponse = sut.handle(mockFakeRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  it('Should call performacneMonitor with correct values', async () => {
    const { sut, performanceMonitorStub } = makeSut()
    const startSpy = jest.spyOn(performanceMonitorStub, 'start')
    const finishSpy = jest.spyOn(performanceMonitorStub, 'finish')

    await sut.handle(mockFakeRequest())

    expect(startSpy).toHaveBeenCalledWith(performanceParams)
    expect(finishSpy).toHaveBeenCalledTimes(1)
  })

  it('Should call finish on throw with status unknown', async () => {
    const { sut, controllerStub, performanceMonitorStub } = makeSut()
    const finishSpy = jest.spyOn(performanceMonitorStub, 'finish')
    jest.spyOn(controllerStub, 'handle').mockRejectedValueOnce(() => {
      throw new Error()
    })
    const httpResponse = sut.handle(mockFakeRequest())
    await expect(httpResponse).rejects.toThrow()
    expect(finishSpy).toHaveBeenCalledWith({ status: 'unknown' })
  })
})
