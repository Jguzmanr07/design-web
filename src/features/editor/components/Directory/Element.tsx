import { useAtom, useSetAtom } from 'jotai'
import { isEqual } from 'lodash-es'

import { ELEMENT_CONTEXT_MENU } from '@/features/editor/const'
import { editorProject, editorSelect } from '@/features/editor/store'
import {
  deleteElement,
  pushElement,
  unshiftElement,
} from '@/features/editor/utils'
import { useContextMenu } from '@/hooks/useContextMenu'
import { generateUuid } from '@/utils/uuid'

import { styles } from './element.styles'

import type { FC } from 'react'
import type { TARGET_TYPE } from 'shared/const'
import type { Element as ElementType } from 'shared/types'

interface Props {
  element: ElementType
  indexList: number[]
  targetType: TARGET_TYPE
}

export const Element: FC<Props> = ({ element, indexList, targetType }) => {
  const setProject = useSetAtom(editorProject)
  const [select, setSelect] = useAtom(editorSelect)
  const isSelect =
    targetType === select?.targetType && isEqual(indexList, select?.indexList)

  const contextMenu = useContextMenu({
    menuList: [
      ...(element.elementList != null
        ? [
            {
              subMenuList: ELEMENT_CONTEXT_MENU.UNSHIFT.LIST.map((subMenu) => ({
                callback: () => {
                  setProject((prevProject) =>
                    unshiftElement(prevProject, targetType, indexList, {
                      ...subMenu,
                      uid: generateUuid(),
                    })
                  )
                },
                text: subMenu.type,
              })),
              text: ELEMENT_CONTEXT_MENU.UNSHIFT.TEXT,
            },
            {
              subMenuList: ELEMENT_CONTEXT_MENU.PUSH.LIST.map((subMenu) => ({
                callback: () => {
                  setProject((prevProject) =>
                    pushElement(prevProject, targetType, indexList, {
                      ...subMenu,
                      uid: generateUuid(),
                    })
                  )
                },
                text: subMenu.type,
              })),
              text: ELEMENT_CONTEXT_MENU.PUSH.TEXT,
            },
          ]
        : []),
      {
        callback: () => {
          setProject((prevProject) =>
            deleteElement(prevProject, targetType, indexList)
          )
        },
        text: ELEMENT_CONTEXT_MENU.DELETE.TEXT,
      },
    ],
  })

  const handleClick = (): void => {
    setSelect({
      indexList,
      targetType,
      uid: element.uid,
    })
  }

  return (
    <div {...contextMenu} css={[isSelect && styles.select]}>
      <div onClick={handleClick}>
        <div css={styles.content}>{element.type}</div>
      </div>
      <div css={styles.children}>
        <div onClick={handleClick} />
        {element.elementList != null && (
          <div>
            {element.elementList.map((childElement, childIndex) => (
              <Element
                element={childElement}
                indexList={[...indexList, childIndex]}
                key={[...indexList, childIndex].join('-')}
                targetType={targetType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
