export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest<BodyType = any, ParamsType = any, QueryType = any> = {
  body?: BodyType
  params?: ParamsType
  query?: QueryType
  files?: any
  email?: string
}

export type HttpPagination = {
  page?: string
  items?: string
}
