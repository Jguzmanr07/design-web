import { Provider as JotaiProvider } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Preview } from '@/routes/Preview'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <JotaiProvider>
      <Preview />
    </JotaiProvider>
  </React.StrictMode>
)
