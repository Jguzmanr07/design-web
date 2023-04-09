import {
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { editorRoutes } from '@/features/editor/routes'
import { Providers } from '@/providers'

import type { FC } from 'react'

const router = createBrowserRouter([
  ...editorRoutes,
  {
    element: <Link to="/editor">Editor</Link>,
    path: '/',
  },
  {
    element: <Navigate to="/" />,
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
