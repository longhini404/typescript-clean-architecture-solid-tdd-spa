import { loadTagByIdResultSchema } from '@/main/docs/schemas/index'

export const loadTagByIdPath = {
  get: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['Tag'],
    summary: 'API to load a tag in the system',
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
        description: 'Success',
        content: {
          'application/json': {
            schema: loadTagByIdResultSchema,
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
