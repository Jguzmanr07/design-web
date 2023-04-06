import { useCallback, useEffect, useState } from 'react'

import { TARGET_TYPE } from '@/features/editor/const'
import type { Component, Page } from '@/features/editor/types'
import { IFRAME_EVENT, PREVIEW_PARAM } from '@/features/preview/const'

import type { FC } from 'react'

export const Preview: FC = () => {
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
      window.location.origin
    )
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [handleMessage, target, type])

  return (
    <div>
      <h1>{type}</h1>
      {JSON.stringify(page)}
      {JSON.stringify(component)}
    </div>
  )
}
