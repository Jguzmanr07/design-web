import { Outlet } from 'react-router-dom'

import styles from './styles/index.module.css'
import { ToolBar } from './ToolBar'

import type { FC } from 'react'

export const Editor: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toolBar}>
        <ToolBar />
      </div>
      <main className={styles.content}>
        <Outlet />
      </main>
      <div className={styles.statusBar}></div>
    </div>
  )
}
