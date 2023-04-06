import { Link } from 'react-router-dom'

import { styles } from './index.styles'

import type { FC } from 'react'

const PERSONA: string[] = ['designer']

export const ToolBar: FC = () => {
  return (
    <div css={styles.container}>
      <h2>ToolBar</h2>
      {PERSONA.map((persona) => (
        <Link key={persona} to={`/editor/${persona}`}>
          <button>{persona}</button>
        </Link>
      ))}
    </div>
  )
}
