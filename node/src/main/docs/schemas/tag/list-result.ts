export const listTagsResultSchema = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      items: {
        properties: {
          id: {
            type: 'number',
          },
          title: {
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
