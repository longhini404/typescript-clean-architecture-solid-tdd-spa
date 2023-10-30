import { updateTaskParamsSchema } from '@/main/docs/schemas/index'

export const updateTaskPath = {
  patch: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['Task'],
    summary: 'API to update a task in the system',
    requestBody: {
      content: {
        'application/json': {
          schema: updateTaskParamsSchema,
        },
      },
    },
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
