import { DeleteTag } from '@/domain/usecases/tag'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type HttpParams = {
  tag_id: number
}

export class DeleteTagController implements Controller {
  constructor(private readonly validation: Validation, private readonly deleteTag: DeleteTag) {}

  async handle(httpRequest: HttpRequest<HttpParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)

    if (error) {
      return badRequest(error)
    }

    const { tag_id } = httpRequest.params

    await this.deleteTag.delete({
      tag_id,
    })

    return noContent()
  }
}
