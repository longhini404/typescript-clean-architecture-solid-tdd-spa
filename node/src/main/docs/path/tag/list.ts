import { listTagsResultSchema } from '@/main/docs/schemas/index'

export const listTagsPath = {
  get: {
    security: [
      {
        authToken: [],
      },
    ],
    parameters: [
      {
        in: 'query',
        name: 'page',
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'items',
        schema: {
          type: 'string',
        },
      },
    ],
    tags: ['Tag'],
    summary: 'API to list tags in the system',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: listTagsResultSchema,
          },
        },
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
