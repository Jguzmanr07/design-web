import type { ElementProps } from '../Element'
import { Element } from '../Element'

import type { FC } from 'react'

const Group: FC<ElementProps> = ({ element, indexList }) => {
  const { elementList = [] } = element

  return (
    <div>
      {elementList.map((childElement, childIndex) => (
        <Element
          element={childElement}
          indexList={[...indexList, childIndex]}
          key={[...indexList, childIndex].join('-')}
        />
      ))}
    </div>
  )
}

export default Group
