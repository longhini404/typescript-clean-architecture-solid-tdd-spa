import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLogged } from 'core/store/modules/auth/selector'
import { LayoutSigned, LayoutDefault } from 'components/layout'

type RouterProps = {
  component: any
  isPrivate?: boolean
  exact?: boolean
  path?: string
  rest?: any
}

const RouteWrapper = ({
  component: Component,
  isPrivate,
  ...rest
}: RouterProps) => {
  const signed = useSelector(getIsLogged)

  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />
  }

  const Layout = signed ? LayoutSigned : LayoutDefault

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

export default RouteWrapper
