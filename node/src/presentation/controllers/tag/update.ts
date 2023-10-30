import { Tag } from '@/domain/entities'
import { UpdateTag } from '@/domain/usecases/tag'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type HttpParams = {
  tag_id: number
}

type BodyParams = Partial<Tag>

export class UpdateTagController implements Controller {
  constructor(private readonly validation: Validation, private readonly updateTag: UpdateTag) {}

  async handle(httpRequest: HttpRequest<BodyParams, HttpParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)

    if (error) {
      return badRequest(error)
    }

    const { tag_id } = httpRequest.params

    await this.updateTag.update({
      tag_id,
      information_to_update: httpRequest.body,
    })

    return noContent()
  }
}
