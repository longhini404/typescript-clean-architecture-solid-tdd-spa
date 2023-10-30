export const listTasksResultSchema = {
  type: 'object',
  properties: {
    tasks: {
      type: 'array',
      items: {
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
      },
    },
    pagination: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
        },
        total: {
          type: 'number',
        },
        items: {
          type: 'number',
        },
      },
    },
  },
}
