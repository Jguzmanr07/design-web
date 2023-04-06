import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { editorRoutes } from '@/features/editor/routes'
import { Providers } from '@/providers'

import type { FC } from 'react'

const router = createBrowserRouter([
  ...editorRoutes,
  {
    element: <Navigate to="/editor" />,
    path: '*',
  },
])

export const App: FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}
