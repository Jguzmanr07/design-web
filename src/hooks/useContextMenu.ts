import { useCallback, useContext } from 'react'

import { ContextMenuContext } from '@/providers/ContextMenuProvider'

import type { MouseEvent } from 'react'

interface Menu {
  text: string
  callback: VoidFunction
  children?: Menu[]
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
      const { clientX, clientY } = event
      setContextMenu(clientY, clientX, menus)
    },
    [menus, setContextMenu]
  )

  return {
    onContextMenu: handleContextMenu,
  }
}
