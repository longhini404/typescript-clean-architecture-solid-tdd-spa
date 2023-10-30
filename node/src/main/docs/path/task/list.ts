import { listTasksResultSchema } from '@/main/docs/schemas/index'

export const listTasksPath = {
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
    tags: ['Task'],
    summary: 'API to list tasks in the system',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: listTasksResultSchema,
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
