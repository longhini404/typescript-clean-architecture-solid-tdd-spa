/* eslint-disable consistent-return */
import axios from 'axios'

type Pagination = {
  pagination: {
    total: number
    page: number
    items: number
  }
}

export type PaginationRequest<T = any> = Pagination & T

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export default api
