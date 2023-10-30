import { AxiosRequestConfig } from 'axios'
import useRequest, { UseRequestReturn } from './use-request'

export const useGetApi = <ResponseType = unknown, Error = unknown>(
  path: string,
  params?: AxiosRequestConfig
): UseRequestReturn<ResponseType, Error> => {
  return useRequest<ResponseType, Error>(path, params)
}
