import type { ElementProps } from '../Element'

import type { FC } from 'react'

const Text: FC<ElementProps> = ({ element }) => {
  return <span>{String(element.value)}</span>
}

export default Text
