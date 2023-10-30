import { api } from 'core/services'

export const handleRequestWithSingleParameter = async (
  url: string,
  parameter: any
) => {
  if (parameter) {
    const response = await api.get(`${url}/${parameter}`)
    return response
  }
  throw new Error('Parameter undefined')
}
