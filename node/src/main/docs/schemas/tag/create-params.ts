export const createTagParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
  },
  required: ['title'],
}
