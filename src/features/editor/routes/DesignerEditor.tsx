import { Content } from '@/features/editor/components/Designer/Content'
import { Directory } from '@/features/editor/components/Directory'

import { styles } from './designer-editor.styles'

import type { FC } from 'react'

export const DesignerEditor: FC = () => {
  return (
    <div css={styles.container}>
      <Directory />
      <Content />
    </div>
  )
}
