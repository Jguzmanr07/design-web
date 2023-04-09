import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { PREVIEW_PARAM, IFRAME_EVENT } from 'shared/const'

import { editorPreviewUrl } from '@/features/editor/store'

import type { FC } from 'react'
import type { TARGET_TYPE } from 'shared/const'
import type { Component, Page } from 'shared/types'

interface Props {
  onReadyEnd: VoidFunction
  ready: boolean
  target: Page | Component
  type: TARGET_TYPE
}

export const Iframe: FC<Props> = ({ onReadyEnd, ready, target, type }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null)
  const previewUrl = useAtomValue(editorPreviewUrl)

  useEffect(() => {
    if (iframe.current == null || !ready) {
      return
    }
    iframe.current.contentWindow?.postMessage(
      {
        event: IFRAME_EVENT.INIT,
        [type]: target,
      },
      '*'
    )
    onReadyEnd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  useEffect(() => {
    if (iframe.current == null) {
      return
    }
    iframe.current.contentWindow?.postMessage(
      {
        event: IFRAME_EVENT.CHANGE,
        [type]: target,
      },
      '*'
    )
  }, [target, type])

  return (
    <iframe
      ref={iframe}
      src={`${previewUrl}?${PREVIEW_PARAM.TYPE}=${type}&${PREVIEW_PARAM.TARGET}=${target.uid}`}
    />
  )
}
