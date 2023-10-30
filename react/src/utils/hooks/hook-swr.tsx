import React, { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { renderHook, RenderHookResult } from '@testing-library/react-hooks'

const renderHookWithProviders = <P, R>(
  callback: (props: P) => R
): RenderHookResult<P, R> => {
  const wrapper = ({ children }: { children?: ReactNode }) => (
    <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
  )
  return renderHook(callback, { wrapper })
}

export default renderHookWithProviders
