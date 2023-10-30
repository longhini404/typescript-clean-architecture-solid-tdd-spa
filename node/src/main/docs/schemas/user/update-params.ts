export const updateUserParamsSchema = {
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
    gender: {
      type: 'string',
    },
    status: {
      type: 'number',
    },
  },
}
