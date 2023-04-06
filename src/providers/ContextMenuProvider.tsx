import {
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { UseContextMenuProps } from '@/hooks/useContextMenu'

import type { FC, PropsWithChildren, CSSProperties } from 'react'

type Props = {
  borderRadius?: CSSProperties['borderRadius']
  boxShadow?: CSSProperties['boxShadow']
  width?: CSSProperties['width']
} & PropsWithChildren

interface ContextMenuContextValue {
  setContextMenu: (
    top: number,
    left: number,
    menus: UseContextMenuProps['menus']
  ) => void
}

export const ContextMenuContext = createContext(
  {} as unknown as ContextMenuContextValue
)

const Provider: FC<Props> = ({
  borderRadius = 8,
  boxShadow = '3px 3px 5px 0px rgba(0, 0, 0, 0.4)',
  children,
  width = 300,
}) => {
  const [top, setTop] = useState<number | null>(null)
  const [left, setLeft] = useState<number | null>(null)
  const [menus, setMenus] = useState<UseContextMenuProps['menus'] | null>(null)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'Escape': {
        setTop(null)
        setLeft(null)
        setMenus(null)
      }
    }
  }, [])

  const handleClick = useCallback((event: MouseEvent) => {
    setTop(null)
    setLeft(null)
    setMenus(null)
  }, [])

  const handleBlur = useCallback((event: FocusEvent) => {
    setTop(null)
    setLeft(null)
    setMenus(null)
  }, [])

  const handleContextMenu = useCallback(
    (top: number, left: number, menus: UseContextMenuProps['menus']) => {
      setTop(top)
      setLeft(left)
      setMenus(menus)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('click', handleClick)
      window.addEventListener('blur', handleBlur)
    },
    [handleKeyDown, handleClick, handleBlur]
  )

  useEffect(() => {
    if (
      !Array.isArray(menus) &&
      typeof top !== 'number' &&
      typeof left !== 'number'
    ) {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClick)
      window.removeEventListener('blur', handleBlur)
    }
  }, [top, left, menus, handleKeyDown, handleClick, handleBlur])

  return (
    <ContextMenuContext.Provider
      value={{
        setContextMenu: handleContextMenu,
      }}
    >
      {children}
      {useMemo(
        () =>
          Array.isArray(menus) &&
          typeof top === 'number' &&
          typeof left === 'number' && (
            <div
              className="context-menu"
              onContextMenu={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              style={{
                backgroundColor: '#ddd',
                borderRadius,
                boxShadow,
                left,
                padding: '8px 0',
                position: 'fixed',
                top,
                width,
              }}
            >
              {menus.map((menu) => (
                <div key={menu.text} onClick={menu.callback}>
                  {menu.text}
                </div>
              ))}
            </div>
          ),
        [borderRadius, boxShadow, left, menus, top, width]
      )}
    </ContextMenuContext.Provider>
  )
}

export const ContextMenuProvider = memo(Provider)
