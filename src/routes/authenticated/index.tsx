import { RouteObject } from 'react-router-dom'

import { AuthenticatedHome } from 'components/pages/AuthenticatedHome'

import { AuthenticatedGuard } from './guard'

export const authenticatedRouter: RouteObject = {
  element: <AuthenticatedGuard />,
  children: [{ path: '/my-home', element: <AuthenticatedHome /> }],
}
