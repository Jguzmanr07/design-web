import { useCallback, useEffect, useState } from 'react'

import { TARGET_TYPE, PREVIEW_PARAM, IFRAME_EVENT } from 'shared/const'
import type { Page, Component } from 'shared/types'

import type { FC } from 'react'
import { Element } from './components/Element'

export const App: FC = () => {
  const search = window.location.search
  const searchParam = new URLSearchParams(search)
  const type = searchParam.get(PREVIEW_PARAM.TYPE)
  const target = searchParam.get(PREVIEW_PARAM.TARGET)
  const [page, setPage] = useState<Page | null>(null)
  const [component, setComponent] = useState<Component | null>(null)

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      console.log(event.data)
      switch (event.data.event) {
        case IFRAME_EVENT.INIT:
        case IFRAME_EVENT.CHANGE:
          if (
            type === TARGET_TYPE.PAGE &&
            event.data?.[TARGET_TYPE.PAGE]?.uid === target
          ) {
            setPage(event.data[TARGET_TYPE.PAGE])
          } else if (
            type === TARGET_TYPE.COMPONENT &&
            event.data?.[TARGET_TYPE.COMPONENT]?.uid === target
          ) {
            setComponent(event.data[TARGET_TYPE.COMPONENT])
          }
          break
      }
    },
    [target, type]
  )

  useEffect(() => {
    if (
      typeof type !== 'string' ||
      typeof target !== 'string' ||
      type === '' ||
      target === ''
    ) {
      return
    }
    window.addEventListener('message', handleMessage)
    window.parent.postMessage(
      {
        event: IFRAME_EVENT.READY,
        target,
        type,
      },
      '*'
    )
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [handleMessage, target, type])

  const elementList =
    type === TARGET_TYPE.PAGE ? page?.elementList : component?.elementList

  if (!Array.isArray(elementList)) {
    return null
  }

  return (
    <>
      {elementList.map((childElement, childIndex) => (
        <Element
          element={childElement}
          indexList={[childIndex]}
          key={[childIndex].join('-')}
        />
      ))}
    </>
  )
}
