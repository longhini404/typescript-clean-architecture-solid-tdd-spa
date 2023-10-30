export const listUsersResultSchema = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: {
        properties: {
          id: {
            type: 'number',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          cellphone: {
            type: 'string',
          },
          avatar: {
            type: 'string',
          },
          gender: {
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
