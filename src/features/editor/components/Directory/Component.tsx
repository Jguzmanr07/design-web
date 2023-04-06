import { useSetAtom } from 'jotai'

import {
  TARGET_CONTEXT_MENU,
  TARGET_TYPE,
  ELEMENT_TYPE,
} from '@/features/editor/const'
import { editorProject } from '@/features/editor/store'
import type { Component as ComponentType } from '@/features/editor/types'
import { addElement } from '@/features/editor/utils'
import { useContextMenu } from '@/hooks/useContextMenu'

import type { FC } from 'react'

interface Props {
  component: ComponentType
  index: number
}

const COMPONENT_CONTEXT_MENU: ELEMENT_TYPE[] = [ELEMENT_TYPE.TEXT]

export const Component: FC<Props> = ({ component, index }) => {
  const setProject = useSetAtom(editorProject)

  const contextMenu = useContextMenu({
    menus: [
      ...COMPONENT_CONTEXT_MENU.map((menu) => ({
        callback: () => {
          setProject((prevProject) =>
            addElement(prevProject, TARGET_TYPE.COMPONENT, [index], {
              ...TARGET_CONTEXT_MENU.text.args,
              type: menu,
            })
          )
        },
        text: TARGET_CONTEXT_MENU[menu].text,
      })),
    ],
  })

  return <div {...contextMenu}>{component.uid}</div>
}
