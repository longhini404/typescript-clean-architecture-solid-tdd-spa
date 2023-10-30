import { updateTagParamsSchema } from '@/main/docs/schemas/index'

export const updateTagPath = {
  patch: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['Tag'],
    summary: 'API to update a tag in the system',
    requestBody: {
      content: {
        'application/json': {
          schema: updateTagParamsSchema,
        },
      },
    },
    parameters: [
      {
        in: 'path',
        name: 'tag_id',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      200: {
        description: 'Record updated successfully',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
}
