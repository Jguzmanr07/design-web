import { css } from '@emotion/react'

export const styles = {
  children: css({
    display: 'grid',
    gridTemplateColumns: '16px 1fr',
  }),
  content: css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  }),
  select: css({
    outlineColor: 'red',
    outlineOffset: -1,
    outlineStyle: 'solid',
    outlineWidth: 1,
  }),
}
