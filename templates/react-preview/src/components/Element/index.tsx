import { lazy } from 'react'

import { ELEMENT_TYPE } from 'shared/const'
import type { Element as ElementType } from 'shared/types'

import type { FC } from 'react'

export interface ElementProps {
  element: ElementType
  indexList: number[]
}

const Text = lazy(async () => await import('../Text'))
const Group = lazy(async () => await import('../Group'))

export const Element: FC<ElementProps> = ({ element, indexList }) => {
  switch (element.type) {
    case ELEMENT_TYPE.TEXT:
      return <Text element={element} indexList={indexList} />
    case ELEMENT_TYPE.GROUP:
      return <Group element={element} indexList={indexList} />
    default:
      return null
  }
}
