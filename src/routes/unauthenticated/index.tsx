import { RouteObject } from 'react-router-dom'

import { Home } from 'components/pages/Home'

import { UnauthenticatedGuard } from './guard'

export const unAuthRouter: RouteObject = {
  element: <UnauthenticatedGuard />,
  children: [{ path: '/', element: <Home /> }],
}
