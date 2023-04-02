import { useCallback } from 'react'

import { useContextMenu } from '@/hooks/useContextMenu'

import type { FC } from 'react'

export const Content: FC = () => {
  const handleMenuCallback = useCallback(() => {
    console.log('OK')
  }, [])

  const contextMenu = useContextMenu({
    menus: [
      {
        text: '1',
        callback: handleMenuCallback,
      },
    ],
  })

  return (
    <div {...contextMenu}>
      <h2>Content</h2>
    </div>
  )
}
