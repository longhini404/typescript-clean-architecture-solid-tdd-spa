import { loadTaskByIdResultSchema } from '@/main/docs/schemas/index'

export const loadTaskByIdPath = {
  get: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['Task'],
    summary: 'API to load a task in the system',
    parameters: [
      {
        in: 'path',
        name: 'task_id',
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
            schema: loadTaskByIdResultSchema,
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
