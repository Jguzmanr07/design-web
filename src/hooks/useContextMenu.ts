import { useCallback, useContext } from 'react'

import { ContextMenuContext } from '@/providers/ContextMenuProvider'

import type { MouseEvent } from 'react'

export interface SubMenu {
  callback: VoidFunction
  text: string
}

export interface Menu {
  callback?: VoidFunction
  subMenuList?: SubMenu[]
  text: string
}

export interface UseContextMenuProps {
  menuList: Menu[]
}

export const useContextMenu = ({
  menuList,
}: UseContextMenuProps): {
  onContextMenu: (event: MouseEvent<HTMLElement>) => void
} => {
  const { setContextMenu } = useContext(ContextMenuContext)

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      if (menuList.length === 0) {
        return
      }
      event.preventDefault()
      const { clientX, clientY } = event
      setContextMenu(clientY, clientX, menuList)
    },
    [menuList, setContextMenu]
  )

  return {
    onContextMenu: handleContextMenu,
  }
}
