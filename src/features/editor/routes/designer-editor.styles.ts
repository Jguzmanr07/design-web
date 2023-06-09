import { css } from '@emotion/react'

import {
  DETAIL_WIDTH,
  DIRECTORY_WIDTH,
  STATUS_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
} from '@/features/editor/const/styles'

export const styles = {
  container: css({
    display: 'grid',
    gridTemplateColumns: `${DIRECTORY_WIDTH}px 1fr ${DETAIL_WIDTH}px`,
    height: `calc(100dvh - ${TOOL_BAR_HEIGHT}px - ${STATUS_BAR_HEIGHT}px)`,
  }),
}
