import { useCallback, useContext } from 'react'

import { ContextMenuContext } from '@/providers/ContextMenuProvider'

import type { MouseEvent } from 'react'

interface Menu {
  callback: VoidFunction
  children?: Menu[]
  text: string
}

export interface UseContextMenuProps {
  menus: Menu[]
}

export const useContextMenu = ({
  menus,
}: UseContextMenuProps): {
  onContextMenu: (event: MouseEvent<HTMLElement>) => void
} => {
  const { setContextMenu } = useContext(ContextMenuContext)

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault()
      event.stopPropagation()
      const { clientX, clientY } = event
      setContextMenu(clientY, clientX, menus)
    },
    [menus, setContextMenu]
  )

  return {
    onContextMenu: handleContextMenu,
  }
}
