import { Outlet } from 'react-router-dom'

import { StatusBar } from '@/features/editor/components/StatusBar'
import { ToolBar } from '@/features/editor/components/ToolBar'

import { styles } from './editor.styles'

import type { FC } from 'react'

export const Editor: FC = () => {
  return (
    <div css={styles.container}>
      <div>
        <ToolBar />
      </div>
      <main>
        <Outlet />
      </main>
      <div>
        <StatusBar />
      </div>
    </div>
  )
}
