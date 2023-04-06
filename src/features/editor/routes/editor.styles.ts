import { css } from '@emotion/react'

import {
  STATUS_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
} from '@/features/editor/const/styles'

export const styles = {
  container: css({
    display: 'grid',
    gridTemplateRows: `${TOOL_BAR_HEIGHT}px 1fr ${STATUS_BAR_HEIGHT}px`,
    height: '100dvh',
  }),
}
