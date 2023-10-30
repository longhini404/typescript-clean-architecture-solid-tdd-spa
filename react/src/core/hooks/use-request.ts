/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { api } from 'core/services'

export type GetRequest = AxiosRequestConfig | null

export interface UseRequestReturn<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate'
  > {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data
}

export default function useRequest<Data = unknown, Error = unknown>(
  url: string | null,
  params?: AxiosRequestConfig,
  { fallbackData, ...config }: Config<Data, Error> = {}
): UseRequestReturn<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    url && url,
    async () => api.get(url!, params),
    {
      ...config,
    }
  )

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    mutate,
  }
}
