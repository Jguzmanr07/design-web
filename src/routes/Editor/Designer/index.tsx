import { Content } from './Content'
import { Directory } from './Directory'
import styles from './styles/index.module.css'

import type { FC } from 'react'

export const DesignerEditor: FC = () => {
  return (
    <div className={styles.container}>
      <Directory />
      <Content />
    </div>
  )
}
