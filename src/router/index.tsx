import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import routes from '~react-pages'

import { Layout } from '@/layouts'

const rootRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      ...routes,
      {
        path: '*',
        element: <Navigate to="/exception/404" replace />,
      },
    ],
  },
]

export default function Router() {
  const router = createBrowserRouter(rootRoutes)

  return <RouterProvider router={router} />
}
