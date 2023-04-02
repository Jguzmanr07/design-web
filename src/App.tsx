import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Providers } from '@/providers'
import { Editor } from '@/routes/Editor'
import { DesignerEditor } from '@/routes/Editor/Designer'
import { Home } from '@/routes/Home'

import type { FC } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/editor',
    element: <Editor />,
    children: [
      {
        path: 'designer',
        element: <DesignerEditor />,
      },
    ],
  },
])

export const App: FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}
