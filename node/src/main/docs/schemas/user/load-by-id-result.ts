export const loadUserByIdResultSchema = {
  type: 'object',
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
}
