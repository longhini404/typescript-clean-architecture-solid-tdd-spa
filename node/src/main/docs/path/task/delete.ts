export const deleteTaskPath = {
  delete: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['Task'],
    summary: 'API to delete a task in the system',
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
      204: {
        description: 'Task deleted successfully',
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
