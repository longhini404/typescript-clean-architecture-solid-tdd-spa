import { listUsersResultSchema } from '@/main/docs/schemas/index'

export const listUsersPath = {
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
    tags: ['User'],
    summary: 'API to list users in the system',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: listUsersResultSchema,
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
