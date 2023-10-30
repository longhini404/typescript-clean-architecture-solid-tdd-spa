export const updateTaskParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    dateTime: {
      type: 'number',
    },
    duration: {
      type: 'number',
    },
  },
}
