import { useAtom, useSetAtom } from 'jotai'
import { isEqual } from 'lodash-es'
import { TARGET_TYPE } from 'shared/const'

import { ELEMENT_CONTEXT_MENU } from '@/features/editor/const'
import { editorProject, editorSelect } from '@/features/editor/store'
import {
  deleteElement,
  pushElement,
  unshiftElement,
} from '@/features/editor/utils'
import { useContextMenu } from '@/hooks/useContextMenu'
import { generateUuid } from '@/utils/uuid'

import { Element } from './Element'
import { styles } from './page.styles'

import type { FC } from 'react'
import type { Page as PageType } from 'shared/types'

interface Props {
  index: number
  page: PageType
}

const TYPE = TARGET_TYPE.PAGE

export const Page: FC<Props> = ({ index, page }) => {
  const setProject = useSetAtom(editorProject)
  const [select, setSelect] = useAtom(editorSelect)
  const indexList = [index]
  const isSelect =
    TYPE === select?.targetType && isEqual(indexList, select?.indexList)

  const contextMenu = useContextMenu({
    menuList: [
      {
        subMenuList: ELEMENT_CONTEXT_MENU.UNSHIFT.LIST.map((subMenu) => ({
          callback: () => {
            setProject((prevProject) =>
              unshiftElement(prevProject, TYPE, indexList, {
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
              pushElement(prevProject, TYPE, indexList, {
                ...subMenu,
                uid: generateUuid(),
              })
            )
          },
          text: subMenu.type,
        })),
        text: ELEMENT_CONTEXT_MENU.PUSH.TEXT,
      },
      {
        callback: () => {
          setProject((prevProject) =>
            deleteElement(prevProject, TYPE, indexList)
          )
        },
        text: ELEMENT_CONTEXT_MENU.DELETE.TEXT,
      },
    ],
  })

  const handleClick = (): void => {
    setSelect({
      indexList,
      targetType: TYPE,
      uid: page.uid,
    })
  }

  return (
    <div {...contextMenu} css={[isSelect && styles.select]}>
      <div onClick={handleClick}>
        <div css={styles.content}>{TYPE}</div>
      </div>
      <div css={styles.children}>
        <div onClick={handleClick} />
        <div>
          {page.elementList.map((childElement, childIndex) => (
            <Element
              element={childElement}
              indexList={[index, childIndex]}
              key={[index, childIndex].join('-')}
              targetType={TYPE}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
