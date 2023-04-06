import { useEffect, useRef } from 'react'

import type { TARGET_TYPE } from '@/features/editor/const'
import type { Component, Page } from '@/features/editor/types'
import { PREVIEW_PARAM, IFRAME_EVENT } from '@/features/preview/const'

import type { FC } from 'react'

interface Props {
  ready: boolean
  target: Page | Component
  type: TARGET_TYPE
}

export const Iframe: FC<Props> = ({ ready, target, type }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (iframe.current == null || !ready) {
      return
    }
    iframe.current.contentWindow?.postMessage({
      event: IFRAME_EVENT.INIT,
      [type]: target,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  useEffect(() => {
    if (iframe.current == null) {
      return
    }
    iframe.current.contentWindow?.postMessage({
      event: IFRAME_EVENT.CHANGE,
      [type]: target,
    })
  }, [target, type])

  return (
    <iframe
      ref={iframe}
      src={`/preview.html?${PREVIEW_PARAM.TYPE}=${type}&${PREVIEW_PARAM.TARGET}=${target.uid}`}
    />
  )
}
