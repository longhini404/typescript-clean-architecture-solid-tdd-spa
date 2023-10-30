export const loadTaskByIdResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
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
}
