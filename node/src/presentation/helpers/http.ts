import { HttpResponse } from '@/presentation/protocols'
import { ServerError } from '@/domain/errors/generic'
import { UnauthorizedError } from '@/domain/errors/authentication'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.message),
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
})
