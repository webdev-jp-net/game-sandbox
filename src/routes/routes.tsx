import { FC } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useAuthLiff } from 'hooks/useAuthLiff'

import { Layout } from 'components/layout/Layout'

import { Dice } from 'components/pages/Dice'
import { Home } from 'components/pages/Home'
import { Loop } from 'components/pages/Loop'
import { NotFound } from 'components/pages/NotFound'
import { Sugoroku } from 'components/pages/Sugoroku'

import { authenticatedRouter } from './authenticated'
import { unAuthRouter } from './unauthenticated'

export const App: FC = () => {
  useAuthLiff() // LIFFにログインする

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
          // element: <Navigate to='/' replace state={{ fromRedirect: true }} />,
        },
        unAuthRouter,
        authenticatedRouter,
        { path: '/sugoroku', element: <Sugoroku /> },
        { path: '/loop', element: <Loop /> },
        { path: '/dice', element: <Dice /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
