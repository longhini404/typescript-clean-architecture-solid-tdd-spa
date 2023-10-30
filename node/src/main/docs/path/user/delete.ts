export const deleteUserPath = {
  delete: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['User'],
    summary: 'API to delete a user in the system',
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
      204: {
        description: 'User deleted successfully',
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
