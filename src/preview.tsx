import React from 'react'
import ReactDOM from 'react-dom/client'

import { Preview } from '@/features/preview/routes/Preview'
import { Providers } from '@/providers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Preview />
    </Providers>
  </React.StrictMode>
)
