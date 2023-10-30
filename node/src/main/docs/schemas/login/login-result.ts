export const loginResultSchema = {
  type: 'object',
  properties: {
    access_token: {
      type: 'string',
    },
    profile: {
      type: 'object',
      properties: {
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
      },
    },
  },
}
