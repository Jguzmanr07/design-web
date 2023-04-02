import { Link } from 'react-router-dom'

import styles from './styles/tool-bar.module.css'

import type { FC } from 'react'

const PERSONA: string[] = ['designer']

export const ToolBar: FC = () => {
  return (
    <div className={styles.container}>
      <h2>ToolBar</h2>
      {PERSONA.map((persona) => (
        <Link key={persona} to={`/editor/${persona}`}>
          <button>{persona}</button>
        </Link>
      ))}
    </div>
  )
}
