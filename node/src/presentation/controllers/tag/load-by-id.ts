import { LoadTagById } from '@/domain/usecases/tag'
import { badRequest, success } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type HttpParams = {
  tag_id: number
}

export class LoadTagByIdController implements Controller {
  constructor(private readonly validation: Validation, private readonly loadTag: LoadTagById) {}

  async handle(httpRequest: HttpRequest<HttpParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)

    if (error) {
      return badRequest(error)
    }

    const { tag_id } = httpRequest.params

    const tag = await this.loadTag.load({
      tag_id,
    })

    return success(tag)
  }
}
