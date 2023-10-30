import { Tag } from '@/domain/entities'
import { CreateTag } from '@/domain/usecases/tag'
import { badRequest, success } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type BodyParams = Omit<Tag, 'id'>

export class CreateTagController implements Controller {
  constructor(private readonly validation: Validation, private readonly createTag: CreateTag) {}

  async handle(httpRequest: HttpRequest<BodyParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    const tag = await this.createTag.create(httpRequest.body)

    return success({
      id: tag.id,
    })
  }
}
