export const createUserParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
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
  required: ['name', 'email', 'password', 'cellphone', 'gender'],
}
