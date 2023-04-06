import { DesignerEditor } from './DesignerEditor'
import { Editor } from './Editor'

import type { RouteObject } from 'react-router-dom'

export const editorRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <DesignerEditor />,
        path: 'designer',
      },
    ],
    element: <Editor />,
    path: '/editor',
  },
]
