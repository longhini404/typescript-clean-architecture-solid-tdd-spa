import { loadUserByIdResultSchema } from '@/main/docs/schemas/index'

export const loadUserByIdPath = {
  get: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['User'],
    summary: 'API to load a user in the system',
    parameters: [
      {
        in: 'path',
        name: 'user_id',
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
            schema: loadUserByIdResultSchema,
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
