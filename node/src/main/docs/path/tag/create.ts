import { createTagParamsSchema } from '@/main/docs/schemas/index'

export const createTagPath = {
  post: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['Tag'],
    summary: 'API to register a new tag in the system',
    requestBody: {
      content: {
        'application/json': {
          schema: createTagParamsSchema,
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
