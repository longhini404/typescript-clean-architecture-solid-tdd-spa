export const deleteTagPath = {
  delete: {
    security: [
      {
        authToken: [],
      },
    ],
    tags: ['Tag'],
    summary: 'API to delete a tag in the system',
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
      204: {
        description: 'Tag deleted successfully',
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
