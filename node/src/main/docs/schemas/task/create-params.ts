export const createTaskParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    dateTime: {
      type: 'string',
    },
    duration: {
      type: 'string',
    },
  },
  required: ['title', 'description', 'dateTime', 'duration'],
}
