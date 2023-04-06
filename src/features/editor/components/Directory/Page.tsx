import { useSetAtom } from 'jotai'

import {
  TARGET_CONTEXT_MENU,
  TARGET_TYPE,
  ELEMENT_TYPE,
} from '@/features/editor/const'
import { editorProject } from '@/features/editor/store'
import type { Page as PageType } from '@/features/editor/types'
import { addElement } from '@/features/editor/utils'
import { useContextMenu } from '@/hooks/useContextMenu'

import type { FC } from 'react'

interface Props {
  index: number
  page: PageType
}

const PAGE_CONTEXT_MENU: ELEMENT_TYPE[] = [ELEMENT_TYPE.TEXT]

export const Page: FC<Props> = ({ index, page }) => {
  const setProject = useSetAtom(editorProject)

  const contextMenu = useContextMenu({
    menus: [
      ...PAGE_CONTEXT_MENU.map((menu) => ({
        callback: () => {
          setProject((prevProject) =>
            addElement(prevProject, TARGET_TYPE.PAGE, [index], {
              ...TARGET_CONTEXT_MENU.text.args,
              type: menu,
            })
          )
        },
        text: TARGET_CONTEXT_MENU[menu].text,
      })),
    ],
  })

  return <div {...contextMenu}>{page.uid}</div>
}
