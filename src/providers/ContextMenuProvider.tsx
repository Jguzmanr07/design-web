import { createContext, memo, useCallback, useEffect, useState } from 'react'

import type { Menu, SubMenu } from '@/hooks/useContextMenu'

import type { FC, PropsWithChildren, CSSProperties, MouseEvent } from 'react'

type Props = {
  borderRadius?: CSSProperties['borderRadius']
  boxShadow?: CSSProperties['boxShadow']
  width?: CSSProperties['width']
} & PropsWithChildren

interface ContextMenuContextValue {
  setContextMenu: (top: number, left: number, menuList: Menu[]) => void
}

export const ContextMenuContext = createContext(
  {} as unknown as ContextMenuContextValue
)

const CONTEXT_MENU_CLASS_NAME = 'context-menu'
const CONTEXT_SUB_MENU_CLASS_NAME = 'context-sub-menu'

const Provider: FC<Props> = ({
  borderRadius = 8,
  boxShadow = '3px 3px 5px 0px rgba(0, 0, 0, 0.4)',
  children,
  width = 300,
}) => {
  const [top, setTop] = useState<number | null>(null)
  const [left, setLeft] = useState<number | null>(null)
  const [menuList, setMenuList] = useState<Menu[] | null>(null)
  const [subMenuList, setSubMenuList] = useState<SubMenu[] | null>(null)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'Escape': {
        setTop(null)
        setLeft(null)
        setMenuList(null)
        setSubMenuList(null)
      }
    }
  }, [])

  const handleClick = useCallback(() => {
    setTop(null)
    setLeft(null)
    setMenuList(null)
    setSubMenuList(null)
  }, [])

  const handleBlur = useCallback(() => {
    setTop(null)
    setLeft(null)
    setMenuList(null)
    setSubMenuList(null)
  }, [])

  const handleContextMenu = useCallback(
    (top: number, left: number, menuList: Menu[]) => {
      setTop(top)
      setLeft(left)
      setMenuList(menuList)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('click', handleClick)
      window.addEventListener('blur', handleBlur)
    },
    [handleKeyDown, handleClick, handleBlur]
  )

  const handleMouseOver = (subMenuList?: SubMenu[]): void => {
    setSubMenuList(subMenuList ?? null)
  }

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>): void => {
    try {
      const leaveTarget = event.nativeEvent.relatedTarget as HTMLElement | null
      if (leaveTarget == null) {
        throw new Error('not leave target')
      }
      const contextSubMenu = leaveTarget.closest(
        `div.${CONTEXT_SUB_MENU_CLASS_NAME}`
      )
      if (contextSubMenu == null) {
        throw new Error(`not parent div.${CONTEXT_SUB_MENU_CLASS_NAME}`)
      }
    } catch (err) {
      setSubMenuList(null)
    }
  }

  useEffect(() => {
    if (
      !Array.isArray(menuList) &&
      typeof top !== 'number' &&
      typeof left !== 'number'
    ) {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClick)
      window.removeEventListener('blur', handleBlur)
    }
  }, [top, left, menuList, handleKeyDown, handleClick, handleBlur])

  return (
    <ContextMenuContext.Provider
      value={{
        setContextMenu: handleContextMenu,
      }}
    >
      {children}
      {Array.isArray(menuList) &&
        typeof top === 'number' &&
        typeof left === 'number' && (
          <div
            className={CONTEXT_MENU_CLASS_NAME}
            onContextMenu={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            onMouseLeave={handleMouseLeave}
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
            {menuList.map((menu) => (
              <div
                key={menu.text}
                onClick={menu.callback}
                onMouseOver={() => {
                  handleMouseOver(menu.subMenuList)
                }}
              >
                {menu.text}
              </div>
            ))}
          </div>
        )}
      {Array.isArray(subMenuList) &&
        typeof top === 'number' &&
        typeof left === 'number' && (
          <div
            className={CONTEXT_SUB_MENU_CLASS_NAME}
            onContextMenu={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: '#ddd',
              borderRadius,
              boxShadow,
              left: left + 300,
              padding: '8px 0',
              position: 'fixed',
              top,
              width,
            }}
          >
            {subMenuList.map((subMenu) => (
              <div key={subMenu.text} onClick={subMenu.callback}>
                {subMenu.text}
              </div>
            ))}
          </div>
        )}
    </ContextMenuContext.Provider>
  )
}

export const ContextMenuProvider = memo(Provider)
