import { createTaskParamsSchema } from '@/main/docs/schemas/index'

export const createTaskPath = {
  post: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['Task'],
    summary: 'API to register a new task in the system',
    requestBody: {
      content: {
        'application/json': {
          schema: createTaskParamsSchema,
        },
      },
    },
    responses: {
      200: {
        description: 'Record created successfully',
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
